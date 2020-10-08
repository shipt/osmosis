<p align="center">
<img width="300" src=".github/logo.png" />
</p>

# Osmosis

Osmosis is the spontaneous net movement of state objects through a selectively permeable context into a region of higher solute concentration, in the direction that tends to equalize the state concentrations on the two sides.

Osmosis uses React context and custom hooks to provide lightweight and modularized global state management for any React or React Native project.

# Overview

## Installation

```
yarn add @shipt/osmosis
```

## Usage

To use Osmosis you have to first import the `setupStore` function

```js
import { setupStore } from '@shipt/osmosis';
```

The `setupStore` function takes in an argument that is just a custom hook. The custom hook will return a single object that represents a slice of state and any functions needed to operate on that state.

`setupStore` returns three variables

```js
let [containerContext, wrapperFunction, containerRef] = setupStore(useStateContainer);
```

- `containerContext` is a context variable that gives you access to your state and functions
- `wrapperFunction` is simply a higher order component used to provide the store to the app and should be used to wrap the top level component in the app
- `containerRef` is an object that gives you access to state variables and functions without causing re-renders when changes occur

To connect the state throughout your app you have to import the `StoreProvider` function which is simply an utility for combining several `wrapperFunction`'s into a single higher order component.

```js
import { StoreProvider } from '@shipt/osmosis';
```

`StoreProvider` takes two arguments, the first is an array of the `wrapperFunction`'s returned from `setupStore` and the second is the root component for your app. It then returns the root component fully wrapped within your state container context.

In the wrapper function array order matters, so the more important state containers should be defined first.

```js
let WrappedRoot = StoreProvider([wrapperFunction1, wrapperFunction2], RootComponent);
```

## Example

```js
//counter.store.js
import React, { useState } from 'react';
import { setupStore } from '@shipt/osmosis';

const useCounterContainer = () => {
  const [count, setCount] = useState(0);

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

let [CounterContext, wrapCounter, counterRef] = setupStore(useCounterContainer);

export { CounterContext, wrapCounter };

export default counterRef;
```

```jsx
//counter.js
import React, { useContext } from 'react';
import { CounterContext } from './counter.store';

export default () => {
  const [counterContext] = useContext(CounterContext);
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
import { StoreProvider } from '@shipt/osmosis';
import { wrapCounter } from './counter.store';
import Counter from './counter';

export default StoreProvider([wrapCounter], Counter);
```

## State Persistence with usePersistedState

In order to simplify working with state that needs to be persisted, this library includes a useful utility hook called `usePersistedState`. The persistence for this hook must be configured, and the user can set this up to store key/value pairs with any persistence layer required by using a simple configuration step on app launch.

### Configuration

To configure the persistence layer for `usePersistedState`, simply perform something similar to the following when the app first loads:

```js
import { configureUsePersistedState } from '@shipt/osmosis';

async function getItem(key) {
  let value = // perform async actions to return the value for the key provided 
  return value;
}

async function setItem(key, value) {
  // perform async actions to store the value in storage based on the provided key
}

configureUsePersistedState({ getItem, setItem });
```

### Usage

`usePersistedState` is similar to using React's `useState`, with only a few minor modifications. The hook can be used by performing the following:

```js
import { usePersistedState } from '@shipt/osmosis';

const [stateValue, setStateValue, isHydrated] = usePersistedState(initialValue, persistenceKey);
```

Where the hook params are:

- **initialValue** = the initial value to use for this state, just like from `useState`. This value truly only for the first initialization and will be overridden by any persisted state that is rehydrated on mount.
- **persistenceKey** = the key to be passed to the configured `setItem` function to store the value in the persistence layer.

And the return params are:

- **stateValue** = the value as stored in state, just like from `useState`.
- **setStateValue** = the function to update the value in state. This is almost identical to the function returned from `useState`. The only difference is that in addition to setting the current value in state, it also asynchronously calls the configured `setItem` function to allow the user to store the latest state value in the persistence layer desired, using the `persistenceKey` supplied.
- **isHydrated** = a boolean value determining if the persisted value has been loaded into state. Since reading and writing values to the persistence layer is done async, it is often required to delay performing certain actions after the persisted state has been rehydrated into state during the current app session, such as refreshing a user's persisted but expired auth token.
