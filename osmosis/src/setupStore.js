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
    if (!!store.Context) throw new Error("'Context' property is protected and cannot exist on a store object");
    if (!!store.Provider) throw new Error("'Provider' property is protected and cannot exist on a store object");

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
