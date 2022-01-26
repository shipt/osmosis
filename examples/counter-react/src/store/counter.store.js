import { useState } from 'react';
import { setupStore, usePersistedState } from '@shipt/osmosis';

const useCounterContainer = () => {
  const [count, setCount] = useState(0);
  const [persistedCount, setPersistedCount] = usePersistedState(0, 'persistedCount');

  const incrementCount = () => setCount(count + 1);

  const decrementCount = () => setCount(count - 1);

  // showing supporting functional state updates
  const incrementPersistedCount = () => setPersistedCount(currentCount => currentCount + 1);

  // showing supporting non-functional state updates
  const decrementPersistedCount = () => setPersistedCount(persistedCount - 1);

  return {
    state: {
      count,
      persistedCount
    },
    incrementCount,
    decrementCount,
    incrementPersistedCount,
    decrementPersistedCount
  };
};

let CounterStore = setupStore(useCounterContainer);
let DynamicCounterStore = setupStore(useCounterContainer);

export { CounterStore, DynamicCounterStore };
