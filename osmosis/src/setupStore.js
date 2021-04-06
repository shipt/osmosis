import React, { createContext } from 'react';

class Container {
  constructor() {
    this.container = {
      state: {}
    };
  }
}

/**
 * @callback useCustomHook
 * @returns {Object}
 */

/**
 * @param {useCustomHook} useCustomHook
 * @param {Object=} classContainer - Deprecated: classContainer support will be removed in a future release
 * @returns {Object[]}
 */
const setupStore = (useCustomHook, classContainer) => {
  const StoreContext = createContext();
  let store = { state: {} };

  const withStoreContext = WrappedComponent => props => {
    let container = useCustomHook();
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

export { Container, setupStore };
