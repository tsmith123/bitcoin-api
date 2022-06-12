export interface BtcdConfig {
  uri: string;
  username: string;
  password: string;
  certificatePath: string;
}

export interface BtcdClient {
  _tryConnect(): void;
  // Needs other class methods adding here
}

export interface Context {
  btcd: BtcdClient;
}
