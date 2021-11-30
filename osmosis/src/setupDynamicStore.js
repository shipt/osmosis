import React, { createContext } from 'react';
import PropTypes from 'prop-types';

const _defaultExtractor = (store, _, ref) => {
  for (let key in store) {
    ref[key] = store[key];
  }
};
const _defaultConfig = { proxyEnabled: true, storeExtractor: _defaultExtractor };

/**
 * @typedef Wrapper
 * @type {Function}
 * @returns {React.Component}
 */

/**
 * @typedef DynamicStore
 * @property {React.Context} Context
 * @property {Component} Provider
 * @property {Function} Wrapper
 */

/**
 *
 * @param {Function} useCustomHook
 * @param {{ ref: {} }} proxyRef
 * @returns {DynamicStore} DynamicStore
 */
export const setupDynamicStore = (useCustomHook, config = _defaultConfig) => {
  const proxyRef = {};
  const Context = createContext({});

  const Provider = ({ children, ...props }) => {
    const store = useCustomHook(props);
    config.storeExtractor(store, props, proxyRef);
    return <Context.Provider value={store}>{children}</Context.Provider>;
  };

  Provider.propTypes = {
    children: PropTypes.node
  };

  const Wrapper = WrappedComponent =>
    function ComponentWithWrapper(props) {
      return (
        <Provider {...props}>
          <WrappedComponent {...props} />
        </Provider>
      );
    };

  // eslint-disable-next-line
  if (!!Proxy && config.proxyEnabled)
    // eslint-disable-next-line
    return new Proxy(proxyRef, {
      get: (target, property) => {
        if (property === 'Context') return Context;
        if (property === 'Provider') return Provider;
        if (property === 'Wrapper') return Wrapper;
        return target[property];
      },
      set: (target, property, value) => (target[property] = value)
    });

  proxyRef.Context = Context;
  proxyRef.Provider = Provider;
  proxyRef.Wrapper = Wrapper;
  return proxyRef;
};

/**
 * ref to be used with setupDynamicStore
 * @returns {{ ref: {}}}
 */
export const createStoreRef = () => ({ ref: {} });
