<p align="center">
<img width="300" src="https://github.com/shipt/osmosis/blob/master/logo.png" />
</p>

# Advanced Usage

## Store Props

There are some use cases where you want your store to be influenced by arguments at runtime. Imagine a CounterStore that holds multiple counters and increments or decrements by a value rather than just 1, or parallel instances of a store with slightly different functionality. You could...

- nest the store logic in a single store's value, which can quickly get hairy and annoying to maintain (as well as cause extra re-renders for consumers)
- have the increment/decrement functions take an argument (simple with small stores, but increasingly complicated with larger stores)
- you can pass props to your wrapped component (example below) to modify your custom hook's behavior <-----you are here

If you have a large store that holds frequently updated data, you could wrap consumers in a local Osmosis store that can be used to derive a simpler state to keep component and store logic more closely held.

## Store Key

By having parallel stores, there is a threat of the storeRef values being constantly overwritten by all of your various stores. This can be solved by simply passing a `storeKey` to your wrapped component to nest the hook's result under your `storeKey`.

This will preserve all the parallel store's values under the provided `storeKey`, allowing you to reference and act on those stores as necessary (`CounterStore[storeKey1]` gets you the store associated with `storeKey1`).

## Example

```js
//counter.store.js
import React, { useState } from 'react';
import { setupStore } from '@shipt/osmosis';

const useCounterStore = props => {
  const [count, setCount] = useState(0);
  const interval = props.interval ?? 0;

  const increment = () => {
    setCount(count + interval);
  };

  const decrement = () => {
    setCount(count - interval);
  };

  return {
    state: {
      count,
      interval
    },
    increment,
    decrement
  };
};

let CounterStore = setupStore(useCounterStore);

export default CounterStore;
```

```jsx
//counter.js
import React, { useContext } from 'react';
import { CounterStore } from './counter.store';

export default () => {
  const [counterStore] = useContext(CounterStore.Context);
  let { count } = counterStore.state;

  return (
    <div>
      <p>{count}</p>
      <button onClick={counterStore.increment}>+{interval}</button>
      <button onClick={counterStore.decrement}>-{interval}</button>
    </div>
  );
};
```

```jsx
//index.js Root Component
import React from 'react
import { CounterStore } from './counter.store';
import Counter from './counter';

const intervals = [1, 2, 3];

const Counters = () => {
  return (
    <>
      {intervals.map(interval => (
        <Counter key={String(interval)} storeKey={interval} interval={interval} />
      ))}
    </>
  );
});

export default CounterStore.Provider(Counters);
```
