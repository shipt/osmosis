import { useState, useEffect } from 'react';

let getItem;
let setItem;

export const usePersistedState = (initValue, key) => {
  if (!key) console.error('usePersistedState: Storage key is required');

  let [state, setState] = useState({ value: initValue, isLoaded: false });

  useEffect(() => {
    if (!getItem)
      console.warn('usePersistedState: Method "getItem" is not configured. Please call "configureUsePersistedState"');
    if (!setItem)
      console.warn('usePersistedState: Method "setItem" is not configured. Please call "configureUsePersistedState"');

    _loadPersistedState();
  }, []);

  const _loadPersistedState = async () => {
    let persistedValue = null;
    if (getItem) persistedValue = await getItem(key);
    setState(state => {
      return {
        value: persistedValue || state.value,
        isLoaded: true
      };
    });
  };

  const setPersistedState = value => {
    if (setItem) setItem(key, value);
    setState({
      value,
      isLoaded: true
    });
  };

  return [state.value, setPersistedState, state.isLoaded];
};

export const configureUsePersistedState = config => {
  getItem = config.getItem;
  setItem = config.setItem;
};
