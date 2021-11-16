import { StoreProvider } from './storeProvider.js';
import { setupStore } from './setupStore.js';
import { setupDynamicStore } from './setupDynamicStore.js';
import { usePersistedState, configureUsePersistedState } from './usePersistedState.js';

export { setupStore, StoreProvider, usePersistedState, configureUsePersistedState, setupDynamicStore };
export default {
  setupStore,
  StoreProvider,
  usePersistedState,
  configureUsePersistedState,
  setupDynamicStore
};
