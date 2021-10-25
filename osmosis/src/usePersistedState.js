import { useState, useEffect } from 'react';

let getItem;
let setItem;

/**
 * @param {Object} initValue
 * @param {string} key
 * @returns {Object[]}
 */
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
        value: persistedValue ?? state.value,
        isLoaded: true
      };
    });
  };

  const setPersistedState = value => {
    if (typeof value === 'function') {
      setState(currentValue => {
        const newValue = value(currentValue.value);
        if (setItem) setItem(key, newValue);
        return {
          value: newValue,
          isLoaded: true
        };
      });
    } else {
      if (setItem) setItem(key, value);
      setState({
        value,
        isLoaded: true
      });
    }
  };

  return [state.value, setPersistedState, state.isLoaded];
};

/**
 * @callback getItem
 * @param {string} key
 * @returns {Promise} Promise<value>
 */

/**
 * @callback setItem
 * @param {string} key
 * @param {Object} value
 * @returns {Promise} Promise<>
 */

/**
 * @param {Object} config
 * @param {getItem} config.getItem
 * @param {setItem} config.setItem
 */
export const configureUsePersistedState = config => {
  getItem = config.getItem;
  setItem = config.setItem;
};
