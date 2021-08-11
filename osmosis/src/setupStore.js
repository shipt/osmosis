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
    const e = "cannot have previous 'Provider' or 'Context' defined";
    if (store.Provider != undefined || store.Context != undefined)
    {
      return e;
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

export { setupStore };
