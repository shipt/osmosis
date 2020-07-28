import React, { useContext } from 'react';
import { CounterContext } from './store';

export default () => {
  const [counterContext] = useContext(CounterContext);
  let { count } = counterContext.state;

  return (
    <div data-testid="counter-wrap">
      <p>{count}</p>
      <button data-testid="increment" onClick={counterContext.increment}>
        +
      </button>
      <button data-testid="decrement" onClick={counterContext.decrement}>
        -
      </button>
    </div>
  );
};
