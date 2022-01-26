import React, { useContext } from 'react';
import { CounterStore } from './store';

const PersistedCounter = () => {
  const counterStore = useContext(CounterStore.Context);
  let { persistedCount } = counterStore.state;

  return (
    <div data-testid="counter-wrap">
      <p>Persisted Count: {persistedCount}</p>
      <button data-testid="decrement" onClick={counterStore.decrementPersistedCount}>
        -
      </button>
      <button data-testid="increment" onClick={counterStore.incrementPersistedCount}>
        +
      </button>
    </div>
  );
};

export default PersistedCounter;
