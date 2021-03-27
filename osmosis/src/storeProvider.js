export const StoreProvider = (storeProviders, wrappedComponent) => {
  if (!storeProviders || !wrappedComponent) {
    throw new Error('could not find array of store providers or your wrapped root component; please ensure your provide at least an empty array and your root component to the StoreProvider from osmosis');
  }

  storeProviders.reverse().forEach(provider => (wrappedComponent = provider(wrappedComponent)));
  return wrappedComponent;
};
