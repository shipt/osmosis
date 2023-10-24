'use client';

import { StoreProvider, configureUsePersistedState } from '@shipt/osmosis';
import * as Stores from './';

configureUsePersistedState({
  getItem: key => JSON.parse(window.localStorage.getItem(key)),
  setItem: (key, value) => window.localStorage.setItem(key, JSON.stringify(value))
});

const StateStoreProvider = ({children}) => {
  return children;
};

export default StoreProvider([
  Stores.CounterStore.Provider,
  Stores.DynamicCounterStore.Provider,
  Stores.CounterWithReducerStore.Provider
], StateStoreProvider);
