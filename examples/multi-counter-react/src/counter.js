import React, { useContext } from 'react';
import { CounterStore } from './store';

const Counter = ({ name }) => {
  const { decrementCount, count } = useContext(CounterStore.Context);
  // incrementCount exists on the context value, but I wanted to include the line below to demonstrate how
  // the store ref works with nested stores when used with a store extractor
  const { incrementCount } = CounterStore[name];

  return (
    <div data-testid="counter-wrap">
      <p>
        {name}: {count}
      </p>
      {/* example using a function from the counter context */}
      <button data-testid="decrement" onClick={decrementCount}>
        -
      </button>
      {/* example invoking a function on an externally available ref */}
      <button data-testid="increment" onClick={incrementCount}>
        +
      </button>
    </div>
  );
};

const CounterWithStore = props => {
  return (
    <CounterStore.Provider name={props.name}>
      <Counter name={props.name} />
    </CounterStore.Provider>
  );
};

export default CounterWithStore;
