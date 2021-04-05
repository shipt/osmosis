import React, { createContext } from 'react';

class Container {
  constructor() {
    this.container = {
      state: {}
    };
  }
}

/**
 * @callback useHook
 * @returns {Object}
 */

/**
 * @param {useHook} useHook
 * @param {Object} [classContainer]
 * @returns {Object[]}
 */
const setupStore = (useHook, classContainer) => {
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

export { Container, setupStore };
