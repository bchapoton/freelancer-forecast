import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import parametersService, { TotalSummary, YearSummary } from '../../services/ParametersService';

export interface FinancialState {
    yearSummary: YearSummary;
}

const emptyTotals: TotalSummary = parametersService.buildEmptyTotalSummary();

const initialState: FinancialState = {
    yearSummary: { monthSummaries: [], totals: emptyTotals },
};

export const financialSlice = createSlice({
    name: 'financial',
    initialState,
    reducers: {
        setYearSummary: (state, action: PayloadAction<YearSummary>) => {
            state.yearSummary = action.payload;
        },
    },
});

export const { setYearSummary } = financialSlice.actions;

export const selectYearSummary: (state: RootState) => YearSummary = (state: RootState) => state.financial.yearSummary;

export default financialSlice.reducer;
