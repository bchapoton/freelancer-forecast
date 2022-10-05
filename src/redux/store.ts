import { configureStore } from '@reduxjs/toolkit';
import parametersReducer from './slices/ParametersSlice';
import financialReducer from './slices/FinancialSlice';

export const store = configureStore({
    reducer: {
        parameters: parametersReducer,
        financial: financialReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
