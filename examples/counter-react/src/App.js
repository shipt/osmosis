import { StoreProvider, configureUsePersistedState } from '@shipt/osmosis';
import { CounterStore, CounterWithReducerRef } from './store';

import Counter from './counter';
import PersistedCounter from './persistedCounter.js';
import DispactCounter from './dispatchCounter.js';

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
    </>
  );
};

export default StoreProvider([CounterStore.Provider, CounterWithReducerRef.Provider], App);
