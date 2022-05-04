/* eslint-disable react/prop-types */
import React, { createContext } from 'react';

let _defaultConfig = { proxyEnabled: true, legacyReturnStoreAsArray: false };

export const configureSetupStore = config => {
  _defaultConfig = { ..._defaultConfig, ...config };
};

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
 * @template T
 * @param {function(object) : T} useCustomHook
 * @param {SetupStoreConfig} [config = { proxyEnabled: false }] - The setup store config
 * @returns {T & Store}
 */
const setupStore = (useCustomHook, config = {}) => {
  config = { ..._defaultConfig, ...config };
  const StoreContext = createContext();
  // If proxy is not supported
  let storeRef = {};

  // If proxy is supported
  let storeProxy;
  let storeProxyObject = { ref: {} };

  // Legacy Store Provider
  const withLegacyStoreContext = WrappedComponent => props => {
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

  // New Store Provider
  const withStoreContext = WrappedComponent => {
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

      const value = config.legacyReturnStoreAsArray ? [store] : store;

      return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
    };

    const Wrapper = props => (
      <StoreContextWrapper {...props}>
        <WrappedComponent {...props} />
      </StoreContextWrapper>
    );
    return Wrapper;
  };

  if (!!Proxy && config.proxyEnabled) {
    storeProxy = new Proxy(storeProxyObject, {
      get: (target, property) => {
        if (property === 'Context') return StoreContext;
        if (property === 'Provider') return withStoreContext;
        if (property === 'LegacyProvider') return withLegacyStoreContext;
        return target.ref[property];
      },
      set: (target, property, value) => (target.ref[property] = value)
    });
  } else {
    storeRef.Context = StoreContext;
    storeRef.Provider = withStoreContext;
    storeRef.LegacyProvider = withLegacyStoreContext;
  }

  return storeProxy || storeRef;
};

export { setupStore };
