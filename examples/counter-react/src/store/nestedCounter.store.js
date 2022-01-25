import { useContext, useMemo } from 'react';
import { setupStore } from '@shipt/osmosis';
import { CountersStore } from '.';

const useNestedCounter = ({ name }) => {
  const {
    state: { counters },
    incrementCount,
    decrementCount
  } = useContext(CountersStore.Context);

  const count = counters[name] ?? 0;
  const increment = () => incrementCount(name);
  const decrement = () => decrementCount(name);

  console.log({ count });

  const value = useMemo(
    () => ({
      state: {
        count
      },
      increment,
      decrement
    }),
    [count] // eslint-disable-line react-hooks/exhaustive-deps
  );
  return value;
};
export default setupStore(useNestedCounter);
