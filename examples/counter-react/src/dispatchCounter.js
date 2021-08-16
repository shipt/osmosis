import React, { useContext } from 'react';
import { CounterWithReducerStore } from './store';

const PersistedCounter = () => {
  const [counterContext] = useContext(CounterWithReducerStore.Context);
  let { dispatch, counterState: { count }} = counterContext;

  return (
    <div data-testid="counter-wrap">
      <p>Dispatch Count: {count}</p>
      <button data-testid="decrement" onClick={() => dispatch({type: 'decrement'})}>
        -
      </button>
      <button data-testid="increment" onClick={() => dispatch({type: 'increment'})}>
        +
      </button>
    </div>
  );
};

export default PersistedCounter;