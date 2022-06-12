import { BtcdClient } from './btcd';
import { Context } from '@types';

const createContext = config => {
  const context: Context = {
    btcd: new BtcdClient(config.bitcoin.btcd),
  };

  return context;
};

export default createContext;
