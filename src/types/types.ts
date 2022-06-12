import WebSocket from 'ws';

export interface BtcdConfig {
  uri: string;
  username: string;
  password: string;
  certificatePath: string;
}

export interface BtcdClient {
  config: BtcdConfig;
  websocket: WebSocket;
  callCounter: number;
  _tryConnect(): void;
  // Needs other class methods adding here
}

export interface Context {
  btcd: BtcdClient;
}
