import React, { useContext } from 'react';
import { CounterContext } from './store';

const Counter = () => {
  const [counterContext] = useContext(CounterContext);
  let { count } = counterContext.state;

  return (
    <div data-testid="counter-wrap">
      <p>Count: {count}</p>
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
