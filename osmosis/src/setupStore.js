import React, { createContext } from 'react';

const _defaultConfig = { proxyEnabled: true, returnStoreAsArray: false };

/**
 * @callback useCustomHook
 * @returns {Object}
 */

/**
 *  @typedef SetupStoreConfig
 *  @type {Object}
 *  @property {boolean} proxyEnabled - Determines if the store setup should use proxies internally for the store ref, only if proxies are supported
 *  @property {boolean} returnStoreAsArray - Determines if the store setup should set the provider's value as an array with the store as the first element or just as the store
 */

/**
 *  @typedef Store
 *  @type {Object}
 *  @property {Object} Context - The React Context for the store
 *  @property {Object} Provider - The higher order component provider for the store
 */

/**
 * @param {useCustomHook} useCustomHook
 * @param {SetupStoreConfig} [config = { proxyEnabled: false, returnStoreAsArray: false }] - The setup store config
 * @returns {Store}
 */
const setupStore = (useCustomHook, config = _defaultConfig) => {
  const StoreContext = createContext();
  // If proxy is not supported
  let storeRef = { state: {} };

  // If proxy is supported
  let storeProxy;
  let storeProxyObject = { ref: { state: {} } };

  const withStoreContext = WrappedComponent => props => {
    let store = useCustomHook();
    if (!!store.Context) throw new Error("'Context' property is protected and cannot exist on a store object");
    if (!!store.Provider) throw new Error("'Provider' property is protected and cannot exist on a store object");

    if (storeProxy) {
      storeProxyObject.ref = store;
    } else {
      for (let key in store) {
        storeRef[key] = store[key];
      }
    }

    const value = config.returnStoreAsArray ? [store] : store;

    return (
      <StoreContext.Provider value={value}>
        <WrappedComponent {...props} />
      </StoreContext.Provider>
    );
  };

  if (!!Proxy && config.proxyEnabled) {
    storeProxy = new Proxy(storeProxyObject, {
      get: (target, property) => {
        if (property === 'Context') return StoreContext;
        if (property === 'Provider') return withStoreContext;
        return target.ref[property];
      },
      set: (target, property, value) => (target.ref[property] = value)
    });
  } else {
    storeRef.Context = StoreContext;
    storeRef.Provider = withStoreContext;
  }

  return storeProxy || storeRef;
};

export { setupStore };
