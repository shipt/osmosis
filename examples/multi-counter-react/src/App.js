import { configureUsePersistedState } from '@shipt/osmosis';
import { GlobalCounterStore } from './store';

import Counter from './counter';

configureUsePersistedState({
  getItem: key => JSON.parse(window.localStorage.getItem(key)),
  setItem: (key, value) => window.localStorage.setItem(key, JSON.stringify(value))
});

const counters = ['Counter 1', 'Counter 2', 'Counter 3'];

const App = () => {
  return (
    <>
      {counters.map(c => (
        <Counter key={c} name={c} />
      ))}
    </>
  );
};

export default GlobalCounterStore.Provider(App);
