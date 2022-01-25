import React, { useContext } from 'react';
import { NestedCounterStore } from './store';

const Counter = ({ name }) => {
  const {
    state: { count },
    decrement
  } = useContext(NestedCounterStore.Context);

  // this isn't necessary, but this demonstrates how a store ref would be used if a storeKey is provided
  const increment = () => NestedCounterStore[name].increment();

  console.log('Counter ' + name);

  return (
    <div data-testid="counter-wrap">
      <p>
        Counter with key {name}: {count}
      </p>
      <button data-testid="decrement" onClick={decrement}>
        -
      </button>
      <button data-testid="increment" onClick={increment}>
        +
      </button>
    </div>
  );
};
export default NestedCounterStore.Provider(Counter);
