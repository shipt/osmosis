import React, { useContext } from 'react';
import { CounterStore } from './store';

const Counter = () => {
  const counterStore = useContext(CounterStore.Context);
  let { count } = counterStore.state;

  return (
    <div data-testid="counter-wrap">
      <p>Count: {count}</p>
      <button data-testid="decrement" onClick={counterStore.decrementCount}>
        -
      </button>
      <button data-testid="increment" onClick={counterStore.incrementCount}>
        +
      </button>
    </div>
  );
};

export default Counter;
