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
    if (store.Provider != undefined || store.Context != undefined)
    {
      throw "cannot have previous 'Provider' or 'Context' defined";
    }
    for (let key in store) {
      storeRef[key] = store[key];
    }

    return (
      <StoreContext.Provider value={[store]}>
        <WrappedComponent {...props} />
      </StoreContext.Provider>
    );
  };
  storeRef.Context = StoreContext;
  storeRef.Provider = withStoreContext;
  return storeRef;
};

export default setupStore;
