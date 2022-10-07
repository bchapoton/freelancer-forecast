import { configureStore } from '@reduxjs/toolkit';
import parametersReducer from './slices/ParametersSlice';
import summariesReducer from './slices/SummariesSlice';
import uiReducer from './slices/UISlice';

export const store = configureStore({
    reducer: {
        parameters: parametersReducer,
        summaries: summariesReducer,
        ui: uiReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
