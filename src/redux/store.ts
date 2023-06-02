import { configureStore } from '@reduxjs/toolkit';
import parametersReducer from './slices/ParametersSlice';
import summariesReducer from './slices/SummariesSlice';
import uiReducer from './slices/UISlice';
import { StorePreloadedState } from '../helpers/TestHelper';

export const store = storeConfigurator();

export function storeConfigurator(preloadedState?: StorePreloadedState) {
    return configureStore({
        reducer: {
            parameters: parametersReducer,
            summaries: summariesReducer,
            ui: uiReducer,
        },
        preloadedState: preloadedState,
    });
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
