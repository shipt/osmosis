import { StoreProvider, configureUsePersistedState } from '@shipt/osmosis';
import { CounterStore, CounterWithReducerStore, CounterStoreAsIs } from './store';

import Counter from './counter';
import PersistedCounter from './persistedCounter.js';
import DispactCounter from './dispatchCounter.js';
import CounterWithStoreAsIs from './counterWithStoreAsIs.js';

configureUsePersistedState({
  getItem: key => JSON.parse(window.localStorage.getItem(key)),
  setItem: (key, value) => window.localStorage.setItem(key, JSON.stringify(value))
});

const App = () => {
  return (
    <>
      <Counter />
      <PersistedCounter />
      <DispactCounter />
      <CounterWithStoreAsIs />
    </>
  );
};

export default StoreProvider([CounterStore.Provider, CounterWithReducerStore.Provider, CounterStoreAsIs.Provider], App);
