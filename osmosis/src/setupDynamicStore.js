import React, { createContext } from 'react';

const _defaultExtractor = (store, _, ref) => {
  for (let key in store) {
    ref[key] = store[key];
  }
};
const _defaultConfig = { proxyEnabled: true, storeExtractor: _defaultExtractor };

/**
 * @callback useCustomHook
 * @param {Object} props
 * @returns {Object}
 */

/**
 * @typedef Provider
 * @type {Function}
 * @returns {React.Component}
 */

/**
 *
 * @typedef DynamicStore
 * @type {Object}
 * @property {Function} Provider
 * @property {React.Context} Context
 */

/**
 *
 * @param {useCustomHook} useCustomHook
 * @returns {DynamicStore} DynamicStore
 */
export const setupDynamicStore = (useCustomHook, config = _defaultConfig) => {
  const proxyRef = {};
  const Context = createContext({});

  const Provider = WrappedComponent =>
    function ComponentWithWrapper(props) {
      const store = useCustomHook(props);
      config.storeExtractor(store, props, proxyRef);
      return (
        <Context.Provider value={store}>
          <WrappedComponent {...props} />
        </Context.Provider>
      );
    };

  // eslint-disable-next-line
  if (!!Proxy && config.proxyEnabled)
    // eslint-disable-next-line
    return new Proxy(proxyRef, {
      get: (target, property) => {
        if (property === 'Context') return Context;
        if (property === 'Provider') return Provider;
        return target[property];
      },
      set: (target, property, value) => (target[property] = value)
    });

  proxyRef.Context = Context;
  proxyRef.Provider = Provider;
  return proxyRef;
};

/**
 * ref to be used with setupDynamicStore
 * @returns {{ ref: {}}}
 */
export const createStoreRef = () => ({ ref: {} });
