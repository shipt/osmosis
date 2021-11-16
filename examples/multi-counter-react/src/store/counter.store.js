import { useState, useMemo, useContext } from 'react';
import { setupDynamicStore } from '@shipt/osmosis';

const updateState =
  (name, isSubtract = false) =>
  oldState => {
    const newState = { ...oldState };
    const oldCount = newState[name] ?? 0;
    newState[name] = oldCount + (isSubtract ? -1 : 1);
    return newState;
  };

const useGlobalCounterContainer = () => {
  const [countState, setCountState] = useState({});

  const value = useMemo(
    () => ({
      state: countState,
      incrementNameCount: name => setCountState(updateState(name)),
      decrementNameCount: name => setCountState(updateState(name, true))
    }),
    [countState]
  );

  return value;
};

const GlobalCounterStore = setupDynamicStore(useGlobalCounterContainer);

const useCounterContainer = ({ name }) => {
  const { state, incrementNameCount, decrementNameCount } = useContext(GlobalCounterStore.Context);

  const count = state[name] ?? 0;

  const value = useMemo(
    () => ({
      state: {
        count
      },
      incrementCount: () => incrementNameCount(name),
      decrementCount: () => decrementNameCount(name)
    }),
    [count] // eslint-disable-line
  );

  return value;
};

const CounterStore = setupDynamicStore(useCounterContainer);

export { CounterStore, GlobalCounterStore };
