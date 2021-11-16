import React, { useContext } from 'react';
import { CounterStore, counterRef } from './store';

const Counter = ({ name }) => {
  const counterContext = useContext(CounterStore.Context);
  const { count } = counterContext.state;

  return (
    <div data-testid="counter-wrap">
      <p>
        {name}: {count}
      </p>
      {/* example using a function from the counter context */}
      <button data-testid="decrement" onClick={counterContext.decrementCount}>
        -
      </button>
      {/* example invoking a function on an externally available ref */}
      <button data-testid="increment" onClick={counterRef[name].incrementCount}>
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
