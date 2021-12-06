import { useState, useMemo, useContext } from 'react';
import { setupStore } from '@shipt/osmosis';

const updateName =
  (name, isSubtract = false) =>
  oldState => {
    const newState = { ...oldState };
    const oldCount = newState[name] ?? 0;
    newState[name] = oldCount + (isSubtract ? -1 : 1);
    return newState;
  };

/*
  holds all counter states
*/
const GlobalCounterStore = setupStore(() => {
  const [countState, setCountState] = useState({});

  const value = useMemo(
    () => ({
      countState,
      incrementNameCount: name => setCountState(updateName(name)),
      decrementNameCount: name => setCountState(updateName(name, true))
    }),
    [countState]
  );

  return value;
});

/* 
  subscribes to global counters state, accesses name's slice of the global counter state,
  then passes state and functions specific to name's slice of global counter state down in it's provider value
*/
const CounterStore = setupStore(({ name }) => {
  const [{ countState, incrementNameCount, decrementNameCount }] = useContext(GlobalCounterStore.Context);

  const count = countState[name] ?? 0;

  const withName = fn => () => fn(name);

  const value = useMemo(
    () => ({
      count,
      incrementCount: withName(incrementNameCount),
      decrementCount: withName(decrementNameCount)
    }),
    [count] // eslint-disable-line
  );

  return value;
});

export { CounterStore, GlobalCounterStore };
