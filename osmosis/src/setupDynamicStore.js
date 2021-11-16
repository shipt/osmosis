import React, { createContext } from 'react';

/**
 *
 * @typedef Provider
 * @type {Function}
 * @returns {JSX.Element}
 */

/**
 * @callback useCustomHook
 * @param {Object} props
 * @returns {Object}
 */

/**
 *  @typedef Store
 *  @type {Object}
 *  @property {Object} Context - The React Context for the store
 *  @property {Provider} Provider - The Context.Provider wrapper for the store
 */

/**
 * @param {useCustomHook} useCustomHook
 * @returns {Store}
 */
const setupDynamicStore = useCustomHook => {
  const StoreContext = createContext({});

  function Provider({ children, ...props }) {
    const store = useCustomHook(props);
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
  }
  return {
    Context: StoreContext,
    Provider
  };
};

export { setupDynamicStore };
