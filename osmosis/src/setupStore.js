import React, { createContext } from 'react';

const _defaultConfig = { proxyEnabled: true, legacyReturnStoreAsArray: false };

/**
 * @callback useCustomHook
 * @param {Object} props
 * @returns {Object}
 */

/**
 *  @typedef SetupStoreConfig
 *  @type {Object}
 *  @property {boolean} proxyEnabled - Determines if the store setup should use proxies internally for the store ref, only if proxies are supported
 */

/**
 *  @typedef Store
 *  @type {Object}
 *  @property {Object} Context - The React Context for the store
 *  @property {Object} Provider - The higher order component provider for the store
 */

/**
 * @param {useCustomHook} useCustomHook
 * @param {SetupStoreConfig} [config = { proxyEnabled: false }] - The setup store config
 * @returns {Store}
 */
const setupStore = (useCustomHook, config = _defaultConfig) => {
  const StoreContext = createContext();
  // If proxy is not supported
  let storeRef = {};

  // If proxy is supported
  let storeProxy;
  let storeProxyObject = { ref: {} };

  const withStoreContext = WrappedComponent => props => {
    let storeKey = props.storeKey;
    let store = useCustomHook(props);
    if (!!store.Context) throw new Error("'Context' property is protected and cannot exist on a store object");
    if (!!store.Provider) throw new Error("'Provider' property is protected and cannot exist on a store object");

    if (storeProxy) {
      if (storeKey) {
        storeProxyObject.ref[storeKey] = store;
      } else storeProxyObject.ref = store;
    } else {
      if (storeKey) {
        storeRef[storeKey] = store;
      } else {
        for (let key in store) {
          storeRef[key] = store[key];
        }
      }
    }

    const value = config.legacyReturnStoreAsArray ? [store] : store;

    return (
      <StoreContext.Provider value={value}>
        <WrappedComponent {...props} />
      </StoreContext.Provider>
    );
  };

  const withStoreContext2 = WrappedComponent => props => (
    <StoreContextWrapper {...props}>
      <WrappedComponent {...props} />
    </StoreContextWrapper>
  );

  const StoreContextWrapper = ({ children, ...props }) => {
    let storeKey = props.storeKey;
    let store = useCustomHook(props);
    if (!!store.Context) throw new Error("'Context' property is protected and cannot exist on a store object");
    if (!!store.Provider) throw new Error("'Provider' property is protected and cannot exist on a store object");

    if (storeProxy) {
      if (storeKey) {
        storeProxyObject.ref[storeKey] = store;
      } else storeProxyObject.ref = store;
    } else {
      if (storeKey) {
        storeRef[storeKey] = store;
      } else {
        for (let key in store) {
          storeRef[key] = store[key];
        }
      }
    }

    const value = props.legacyReturnStoreAsArray ? [store] : store;

    return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
  };

  if (!!Proxy && config.proxyEnabled) {
    storeProxy = new Proxy(storeProxyObject, {
      get: (target, property) => {
        if (property === 'Context') return StoreContext;
        if (property === 'Provider') return withStoreContext;
        if (property === 'Provider2') return withStoreContext2;
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
