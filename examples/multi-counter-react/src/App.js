import { GlobalCounterStore } from './store';

import Counter from './counter';

const counters = ['Counter 1', 'Counter 2', 'Counter 3'];

const App = () => {
  return (
    <>
      {counters.map(c => (
        <Counter key={c} name={c} storeKey={c} />
      ))}
    </>
  );
};

export default GlobalCounterStore.Provider(App);
