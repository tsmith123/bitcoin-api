import fs from 'fs';
import WebSocket from 'ws';
import { BtcdConfig, BtcdClient } from './../types';

// const JSON_RPC_VERSION = '1.0';
const RECONNECT_INTERVAL = 1000;
// const DEFAULT_PAGE_SIZE = 100;

const ERROR_CODE_NORMAL_CLOSE = 1000;
// const ERROR_CODE_NO_INFORMATION_AVAILABLE = -5;

export default class Client implements BtcdClient {
  config: BtcdConfig;
  websocket: WebSocket;
  callCounter: number;
  callbacks;

  constructor(config: BtcdConfig) {
    this.config = config;
    // this.logger = logger; // Need a logger

    this._tryConnect();
  }

  _tryConnect() {
    try {
      this._connect();
    } catch (e) {
      // this.logger.error(...)
    }
  }

  _connect() {
    this._disconnect();

    const { uri, username, password, certificatePath } = this.config;
    const cert = certificatePath && fs.readFileSync(certificatePath);

    this.websocket = new WebSocket(uri, {
      perMessageDeflate: false,
      headers: {
        Authorization: 'Basic ' + new Buffer(`${username}:${password}`).toString('base64')
      },
      rejectUnauthorized: false,
      ca: [cert], // Trusted certificates in PEM format - https://haxefoundation.github.io/hxnodejs/js/node/tls/SecureContextOptions.html
      cert // Certificate key of the server in PEM format
    });

    this.callCounter = 0;
    this.callbacks = {};

    this.websocket.on('open', this._onOpen.bind(this));
    this.websocket.on('close', this._onClose.bind(this));
    this.websocket.on('error', this._onError.bind(this));
    this.websocket.on('message', this._onMessage.bind(this));
  }

  _disconnect() {
    const websocket = this.websocket;

    if (!websocket) {
      return;
    }

    websocket.removeAllListeners();
    websocket.close();

    delete this.websocket;
  }

  _onOpen() {
    // this.logger.info(`Connected to btcd at ${this.config.uri}`);
    console.log(`Connected to btcd at ${this.config.uri}`);
  }

  _onClose(code) {
    // this.logger.error(`Disconnected from btcd (code: ${code})`);
    console.log(`Disconnected from btcd (code: ${code})`);

    if (code === ERROR_CODE_NORMAL_CLOSE) {
      return;
    }

    // Try to reconnect.
    setTimeout(() => {
      this._tryConnect();
    }, RECONNECT_INTERVAL);
  }

  _onError(error) {
    // this.logger.error(`Btcd error: ${error.message}`);
    console.log(`Btcd error: ${error.message}`);
  }

  _onMessage(message) {
    const data = JSON.parse(message);
    const callback = this.callbacks[data.id];

    if (callback) {
      callback(data.error, data.result);
      delete this.callbacks[data.id];
    } else if (data.method === 'relevanttxaccepted') {
      // this.onRelevantTxAccepted(data.params[0]);
      console.log('Tx Accepted', data.params[0]);
    }
  }
}
