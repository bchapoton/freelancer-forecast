import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import parametersService, { TotalSummary, YearSummary } from '../../services/ParametersService';
import { IncomeTaxesSummary } from '../../services/TaxesService';

export interface SummariesState {
    yearSummary: YearSummary;
    incomeTaxesSummary: IncomeTaxesSummary;
}

const emptyTotals: TotalSummary = parametersService.buildEmptyTotalSummary();

export const initialState: SummariesState = {
    yearSummary: { monthSummaries: [], totals: emptyTotals },
    incomeTaxesSummary: {
        taxBracketSummaries: [],
        netTaxableIncome: {
            netTaxableIncomeResult: 0,
            contractorNetTaxableIncome: 0,
            familyNetTaxableIncome: 0,
            incomeSplittingParts: 1,
        },
        total: 0,
    },
};

export const summariesSlice = createSlice({
    name: 'summaries',
    initialState,
    reducers: {
        setYearSummary: (state, action: PayloadAction<YearSummary>) => {
            state.yearSummary = action.payload;
        },
        setIncomeTaxesSummary: (state, action: PayloadAction<IncomeTaxesSummary>) => {
            state.incomeTaxesSummary = action.payload;
        },
    },
});

export const { setYearSummary, setIncomeTaxesSummary } = summariesSlice.actions;

export const selectYearSummary: (state: RootState) => YearSummary = (state: RootState) => state.summaries.yearSummary;
export const selectIncomeTaxesSummary: (state: RootState) => IncomeTaxesSummary = (state: RootState) =>
    state.summaries.incomeTaxesSummary;

export default summariesSlice.reducer;
