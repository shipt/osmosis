'use client';

import React from 'react';
import { CounterWithReducerStore } from '../../stores';

const CounterWithReducer = () => {
  const {
    dispatch,
    counterState: { count }
  } = CounterWithReducerStore.useStore();

  return (
    <div data-testid="counter-wrap">
      <p>Dispatch Count: {count}</p>
      <button data-testid="decrement" onClick={() => dispatch({ type: 'decrement' })}>
        -
      </button>
      <button data-testid="increment" onClick={() => dispatch({ type: 'increment' })}>
        +
      </button>
    </div>
  );
};

export default CounterWithReducer;
