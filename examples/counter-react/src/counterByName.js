import React, { useContext } from 'react';
import { CounterStore } from './store';

const Counter = ({ name }) => {
  const [counterContext] = useContext(CounterStore.Context);
  let { count } = counterContext.state;

  // this isn't necessary, but this demonstrates how a store ref would be used if a storeKey is provided
  const incrementCount = () => CounterStore[name].incrementCount();

  return (
    <div data-testid="counter-wrap">
      <p>
        Counter with key {name}: {count}
      </p>
      <button data-testid="decrement" onClick={counterContext.decrementCount}>
        -
      </button>
      <button data-testid="increment" onClick={incrementCount}>
        +
      </button>
    </div>
  );
};

export default CounterStore.Provider(Counter);
