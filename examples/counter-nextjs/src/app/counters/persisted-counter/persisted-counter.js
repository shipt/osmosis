'use client';

import React from 'react';
import { CounterStore } from '../../stores/counter.store.js';

const PersistedCounter = () => {
  const {
    state: { persistedCount },
    decrementPersistedCount,
    incrementPersistedCount
  } = CounterStore.useStore();

  return (
    <div data-testid="counter-wrap">
      <p>Persisted Count: {persistedCount}</p>
      <button data-testid="decrement" onClick={decrementPersistedCount}>
        -
      </button>
      <button data-testid="increment" onClick={incrementPersistedCount}>
        +
      </button>
    </div>
  );
};

export default PersistedCounter;

