/* eslint-disable react/prop-types */
import React, { createContext, useContext } from 'react';

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
 * @template T
 * @callback useStore
 * @returns {T}
 */

/**
 *  @template T
 *  @typedef Store
 *  @property {React.Context<T>} Context - The React Context for the store
 *  @property {Object} Provider - The higher order component provider for the store
 *  @property {useStore<T>} useStore - Returns result of useContext(Context)
 */

/**
 * @template T
 * @param {function(object) : T} useCustomHook
 * @param {SetupStoreConfig} [config = { proxyEnabled: false }] - The setup store config
 * @returns {T & Store<T>}
 */
const setupStore = (useCustomHook, config = {}) => {
  config = { ..._defaultConfig, ...config };
  const StoreContext = createContext();

  // If proxy is not supported
  let storeRef = {};

  // If proxy is supported
  let storeProxy;
  let storeProxyObject = { ref: {} };

  // Store Provider
  const withStoreContext = WrappedComponent => {
    const StoreContextWrapper = ({ children, ...props }) => {
      let storeKey = props.storeKey;
      let store = useCustomHook(props);
      if (!!store.Context) throw new Error("'Context' property is protected and cannot exist on a store object");
      if (!!store.Provider) throw new Error("'Provider' property is protected and cannot exist on a store object");
      if (!!store.useStore) throw new Error("'useStore' property is protected and cannot exist on a store object");

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
    const name = useCustomHook.name;
    Wrapper.displayName = `${name.charAt(0).toUpperCase() + name.slice(1)}Wrapper`;
    return Wrapper;
  };

  const useStore = () => useContext(StoreContext);

  if (!!Proxy && config.proxyEnabled) {
    storeProxy = new Proxy(storeProxyObject, {
      get: (target, property) => {
        if (property === 'Context') return StoreContext;
        if (property === 'Provider') return withStoreContext;
        if (property === 'useStore') return target.ref[property] ?? useStore;
        return target.ref[property];
      },
      set: (target, property, value) => (target.ref[property] = value)
    });
  } else {
    storeRef.Context = StoreContext;
    storeRef.Provider = withStoreContext;
    storeRef.useStore = useStore;
  }

  return storeProxy || storeRef;
};

export { setupStore };
