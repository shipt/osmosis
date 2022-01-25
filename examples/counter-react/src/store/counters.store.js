import { useState } from 'react';
import { setupStore } from '@shipt/osmosis';

const useCounters = () => {
  const [counters, setCounters] = useState({});

  const incrementCount = name => setCounters(oldCounters => ({ ...oldCounters, [name]: (oldCounters[name] ?? 0) + 1 }));
  const decrementCount = name => setCounters(oldCounters => ({ ...oldCounters, [name]: (oldCounters[name] ?? 0) - 1 }));

  const value = { state: { counters }, incrementCount, decrementCount };
  return value;
};

export const CountersStore = setupStore(useCounters);
