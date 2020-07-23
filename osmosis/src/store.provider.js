export default (storeProviders, wrappedComponent) => {
  storeProviders.reverse().forEach(provider => (wrappedComponent = provider(wrappedComponent)));
  return wrappedComponent;
};
