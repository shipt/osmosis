import { useState } from 'react';
import { setupStore, usePersistedState } from '@shipt/osmosis';

const useCounterContainer = () => {
  const [count, setCount] = useState(0);
  const [persistedCount, setPersistedCount] = usePersistedState(0, 'persistedCount');

  const incrementCount = () => setCount(count + 1);

  const decrementCount = () => setCount(count - 1);

  const incrementPersistedCount = () => setPersistedCount(persistedCount + 1);

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

let counterRef = setupStore(useCounterContainer);

export { counterRef };
