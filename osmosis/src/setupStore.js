import React, { createContext } from 'react';

/**
 * @callback useCustomHook
 * @returns {Object}
 */

/**
 * @param {useCustomHook} useCustomHook
 * @returns {Object[]}
 */
const setupStore = useCustomHook => {
  const StoreContext = createContext();
  let storeRef = { state: {} };

  const withStoreContext = WrappedComponent => props => {
    let store = useCustomHook();
    for (let key in store) {
      storeRef[key] = store[key];
    }

    return (
      <StoreContext.Provider value={[store]}>
        <WrappedComponent {...props} />
      </StoreContext.Provider>
    );
  };

  return [StoreContext, withStoreContext, storeRef];
};

export { setupStore };
