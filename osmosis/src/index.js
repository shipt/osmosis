import { StoreProvider } from './storeProvider.js';
import { setupStore } from './setupStore.js';
import { setupDynamicStore } from './setupDynamicStore.js';
import { usePersistedState, configureUsePersistedState } from './usePersistedState.js';

export { setupStore, setupDynamicStore, StoreProvider, usePersistedState, configureUsePersistedState };
export default {
  StoreProvider,
  configureUsePersistedState,
  setupDynamicStore,
  setupStore,
  usePersistedState
};
