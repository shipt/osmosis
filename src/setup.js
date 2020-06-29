import React, { createContext } from 'react';

class Container {
  constructor() {
    this.container = {
      state: {}
    };
  }
}

const useContainer = (useHook, store) => {
  const StoreContext = createContext();

  const withStoreContext = WrappedComponent => props => {
    let container = useHook();
    store.container = container;
    return (
      <StoreContext.Provider value={[container]}>
        <WrappedComponent {...props} />
      </StoreContext.Provider>
    );
  };

  return [StoreContext, withStoreContext];
};

export { Container, useContainer };