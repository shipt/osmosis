import React, { createContext } from 'react';
import PropTypes from 'prop-types';

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
  const storeRef = {};
  const Context = createContext({});

  const Wrapper = ({ children, ...props }) => {
    const store = useCustomHook(props);

    if (!!store.Context) throw new Error("'Context' property is protected and cannot exist on a store object");
    if (!!store.Provider) throw new Error("'Provider' property is protected and cannot exist on a store object");

    config.storeExtractor(store, props, storeRef);
    return <Context.Provider value={store}>{children} </Context.Provider>;
  };

  Wrapper.propTypes = {
    children: PropTypes.node
  };

  const Provider = WrappedComponent =>
    function ComponentWithWrapper(props) {
      return (
        <Wrapper {...props}>
          <WrappedComponent {...props} />
        </Wrapper>
      );
    };

  if (!!Proxy && config.proxyEnabled)
    return new Proxy(storeRef, {
      get: (target, property) => {
        if (property === 'Context') return Context;
        if (property === 'Provider') return Provider;
        return target[property];
      },
      set: (target, property, value) => (target[property] = value)
    });

  storeRef.Context = Context;
  storeRef.Provider = Provider;
  return storeRef;
};
