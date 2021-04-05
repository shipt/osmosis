/**
 * @param {Object[]} storeProviders
 * @param {Object} componentToWrap 
 * @returns {Object} wrappedComponent
 */
export const StoreProvider = (storeProviders, wrappedComponent) => {
  if(!Array.isArray(storeProviders)) throw new Error('StoreProvider requires an array of wrapper functions')
  if(!wrappedComponent) throw new Error('StoreProvider requires a component to wrap')

  try {
    storeProviders.reverse().forEach(provider => (wrappedComponent = provider(wrappedComponent)));
    return wrappedComponent;
  } catch(error) {
    throw new Error(`StoreProvider encountered an error: ${error.message}`)
  }
};
