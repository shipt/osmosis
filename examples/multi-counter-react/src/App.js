import { GlobalCounterStore } from './store';

import Counter from './counter';

const counters = ['Counter 1', 'Counter 2', 'Counter 3'];

const App = () => {
  console.log('rendering App');
  return (
    <>
      {counters.map(c => (
        <Counter key={c} name={c} />
      ))}
    </>
  );
};

export default GlobalCounterStore.Provider(App);
