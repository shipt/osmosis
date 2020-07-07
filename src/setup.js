import React, { createContext } from 'react';

class Container {
  constructor() {
    this.container = {
      state: {}
    };
  }
}

const useContainer = (useHook, classContainer) => {
  const StoreContext = createContext();
  let store = { state: {} };

  const withStoreContext = WrappedComponent => props => {
    let container = useHook();
    if (classContainer) {
      classContainer.container = container;
    } else {
      for (let key in container) {
        store[key] = container[key];
      }
    }

    return (
      <StoreContext.Provider value={[container]}>
        <WrappedComponent {...props} />
      </StoreContext.Provider>
    );
  };

  return [StoreContext, withStoreContext, store];
};

export { Container, useContainer };
