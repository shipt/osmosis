# Osmosis

react-osmosis is the spontaneous net movement of state objects through a selectively permeable context into a region of higher solute concentration, in the direction that tends to equalize the state concentrations on the two sides.

Osmosis uses React context and hooks to make an easily accessible and managable state for any React or React Native project

# Maintainers

`@mobile-shopper-devs` Slack Group
`#eng-shopper-app` Slack Channel

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

`useContainer` takes as an argument a functional container that defines your app state. And it returns an array with a context to your state, a state wrapping function and a reference to your state container.

```js
let [ContainerContext, WrapperFunction, ContainerRef] = useContainer(stateContainer);
```

To connect the state throughout your app you have to import the `StoreProvider` function.

```js
import { StoreProvider } from 'osmosis';
```

`StoreProvider` takes two arguments, the first is an array of the wrapper functions returned from `useContainer` and the second is root component for your app. It then returns the root component fully wrapped with in your state container context.

> **Note:** if one of your context containers uses the state from another context container then it's wrapper function must have a higher index in the array than the wrapper function of the container it uses.

```js
let WrappedRoot = StoreProvider([wrapperFunction1, WrapperFunction2], RootComponent);
```

## Example

```js
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
