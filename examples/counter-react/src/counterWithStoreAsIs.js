import React, { useContext } from 'react';
import { CounterStoreAsIs } from './store';

const Counter = () => {
  const counterContext = useContext(CounterStoreAsIs.Context);
  let { count } = counterContext.state;

  return (
    <div data-testid="counter-wrap">
      <p>Count with store as-is: {count}</p>
      <button data-testid="decrement" onClick={counterContext.decrementCount}>
        -
      </button>
      <button data-testid="increment" onClick={counterContext.incrementCount}>
        +
      </button>
    </div>
  );
};

export default Counter;
