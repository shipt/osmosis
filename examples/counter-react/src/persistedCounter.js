import React, { useContext } from 'react';
import { CounterStore } from './store';

const PersistedCounter = () => {
  const counterContext = useContext(CounterStore.Context);
  let { persistedCount } = counterContext.state;

  return (
    <div data-testid="counter-wrap">
      <p>Persisted Count: {persistedCount}</p>
      <button data-testid="decrement" onClick={counterContext.decrementPersistedCount}>
        -
      </button>
      <button data-testid="increment" onClick={counterContext.incrementPersistedCount}>
        +
      </button>
    </div>
  );
};

export default PersistedCounter;
