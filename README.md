# Osmosis

react-osmosis is the spontaneous net movement of state objects through a selectively permeable context into a region of higher solute concentration, in the direction that tends to equalize the state concentrations on the two sides.

Osmosis uses React context and custom hooks to provide lightweight and modularized global state management for any React or React Native project.

# Overview

## Installation

```
yarn add osmosis
```

## Usage

To use Osmosis you have to first import the function `useContainer`

```js
import { useContainer } from 'osmosis';
```

the `useContainer` function takes in an argument that is just a custom hook. The custom hook will return a single object that represents a slice of state, and any functions needed to operate on that state.

`useContainer` returns three variables

```js
let [containerContext, wrapperFunction, containerRef] = useContainer(stateContainer);
```

- `containerContext` is a context variable that gives you access to your state and functions
- `wrapperFunction` is a function that's simply a higher order component used to provide the store to the app, and should be used to wrap the top level component in the app
- `containerRef` is an object that gives you acess to state variables and functions without causing re-renders when changes occur

To connect the state throughout your app you have to import the `StoreProvider` function which is simply an utility for combining several `wrapperFunction`'s into a single higher order component.

```js
import { StoreProvider } from 'osmosis';
```

`StoreProvider` takes two arguments, the first is an array of the `wrapperFunction`'s returned from `useContainer` and the second is the root component for your app. It then returns the root component fully wrapped with in your state container context.

In the wrapper function array order matters, so the more important state containers should be defined first.

```js
let WrappedRoot = StoreProvider([wrapperFunction1, wrapperFunction2], RootComponent);
```

## Example

```js
//counter.store.js
import React, { useState } from 'react';

const counterContainer = () => {
  let [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return {
    state: {
      count
    },
    increment,
    decrement
  };
};

let [CounterContext, wrapCounter, CounterRef] = useContainer(stateContainer);

export { CounterContext, wrapCounter };

export default CounterRef;
```

```jsx
//counter.js
import React, { useContext } from 'raect';
import { CounterContext } from './counter.store';

export default () => {
  let [counterContext] = useContext(CounterContext);
  let { count } = counterContext.state;

  return (
    <div>
      <p>{count}</p>
      <button onClick={counterContext.increment}>+</button>
      <button onClick={counterContext.decrement}>-</button>
    </div>
  );
};
```

```jsx
//index.js Root Component
import { StoreProvider } from 'osmosis';
import { wrapCounter } from './counter.store';
import Counter from './counter';

export default StoreProvider([wrapCounter], Counter);
```
