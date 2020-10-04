import { useState, useEffect } from 'react';

let getItem;
let setItem;

export const usePersistedState = (initValue, key) => {
  if (!key) console.error('Storage key is required when using usePersistedState');

  let [state, setState] = useState({ value: initValue, isLoaded: false });

  useEffect(() => {
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

    _loadPersistedState();
  }, []);

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
