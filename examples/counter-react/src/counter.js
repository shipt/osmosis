import React, { useContext } from 'react';
import { CounterContext } from './store';

export default () => {
  const [counterContext] = useContext(CounterContext);
  let { count } = counterContext.state;

  return (
    <div>
      <p>{count}</p>
      <button onClick={counterContext.increment}>+</button>
      <button onClick={counterContext.decrement}>-</button>
    </div>
  );
};
