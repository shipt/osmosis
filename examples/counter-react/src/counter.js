import React from 'react';
import { CounterStore } from './store';

const Counter = () => {
  const {
    state: { count },
    decrementCount,
    incrementCount
  } = CounterStore.useStore();

  return (
    <div data-testid="counter-wrap">
      <p>Count: {count}</p>
      <button data-testid="decrement" onClick={decrementCount}>
        -
      </button>
      <button data-testid="increment" onClick={incrementCount}>
        +
      </button>
    </div>
  );
};

export default Counter;
