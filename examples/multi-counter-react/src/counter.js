import React, { useContext } from 'react';
import { CounterStore } from './store';

const Counter = ({ name }) => {
  const counterContext = useContext(CounterStore.Context);
  let { count } = counterContext.state;

  console.log('rerendering ', name);

  return (
    <div data-testid="counter-wrap">
      <p>
        {name}: {count}
      </p>
      <button data-testid="decrement" onClick={counterContext.decrementCount}>
        -
      </button>
      <button data-testid="increment" onClick={counterContext.incrementCount}>
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
