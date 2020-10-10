export const StoreProvider = (storeProviders, wrappedComponent) => {
  storeProviders.reverse().forEach(provider => (wrappedComponent = provider(wrappedComponent)));
  return wrappedComponent;
};
