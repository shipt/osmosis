import { StoreProvider, configureUsePersistedState } from '@shipt/osmosis';
import { CounterStore, CounterWithReducerStore } from './store';

import Counter from './counter';
import PersistedCounter from './persistedCounter.js';
import DispatchCounter from './dispatchCounter.js';
import CounterByName from './counterByName.js';

configureUsePersistedState({
  getItem: key => JSON.parse(window.localStorage.getItem(key)),
  setItem: (key, value) => window.localStorage.setItem(key, JSON.stringify(value))
});

const counters = ['A', 'B', 'C'];

const App = () => {
  return (
    <>
      <Counter />
      <PersistedCounter />
      <DispatchCounter />
      {counters.map(name => (
        <CounterByName key={name} storeKey={name} name={name} />
      ))}
    </>
  );
};

export default StoreProvider([CounterStore.Provider, CounterWithReducerStore.Provider], App);
