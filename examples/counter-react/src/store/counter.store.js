import { useState } from 'react';
import { setupStore } from '@shipt/osmosis';

const useCounterContainer = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return {
    state: {
      count
    },
    increment,
    decrement
  };
};

let [CounterContext, wrapCounter, counterRef] = setupStore(useCounterContainer);

export { CounterContext, wrapCounter, counterRef };
