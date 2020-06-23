import React, { useRef } from 'react';
import { useContainer } from './setup';

export const useOsmosis = (useStoreContainer) => {
    const storeContainerRef = useRef();

    const [StoreContext, withStore] = useContainer(useStoreContainer, storeContainerRef);

    return {
        StoreContext,
        withStore,
        storeContainerRef
    }
}