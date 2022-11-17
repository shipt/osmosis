import React from 'react';
import { DynamicCounterStore } from './store';

const Counter = ({ name }) => {
  const {
    state: { count },
    decrementCount
  } = DynamicCounterStore.useStore();

  // this isn't necessary, but this demonstrates how a store ref would be used if a storeKey is provided
  const incrementCount = () => DynamicCounterStore[name].incrementCount();

  return (
    <div data-testid="counter-wrap">
      <p>
        Counter with key {name}: {count}
      </p>
      <button data-testid="decrement" onClick={decrementCount}>
        -
      </button>
      <button data-testid="increment" onClick={incrementCount}>
        +
      </button>
    </div>
  );
};

export default DynamicCounterStore.Provider(Counter);
