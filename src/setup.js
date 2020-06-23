import React, { createContext } from 'react';

const useContainer = (useHook, store) => {
  const StoreContext = createContext();

  const withStoreContext = WrappedComponent => props => {
    let container = useHook();
    store.current = container;
    return (
      <StoreContext.Provider value={[container]}>
        <WrappedComponent {...props} />
      </StoreContext.Provider>
    );
  };

  return [StoreContext, withStoreContext];
};

export { useContainer };