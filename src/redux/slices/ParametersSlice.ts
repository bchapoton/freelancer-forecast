import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TaxationFamilyContext } from '../../services/TaxesService';
import { DayOffContext, PartTimeContext } from '../../services/CalendarService';

export interface ParametersState {
    averageDailyRate: number;
    year: number;
    vatRate: number;
    taxAllowance: number;
    socialContribution: SocialContribution[];
    taxationFamilyContext: TaxationFamilyContext;
    saving: Saving;
    partTime: PartTimeContext;
    dayOffContext: DayOffContext;
}

const initialState: ParametersState = {
    averageDailyRate: 550,
    year: 2022,
    vatRate: 20,
    taxAllowance: 34,
    socialContribution: [
        { rate: 22.2, label: 'Prestations de services (bnc et bic) et vente de marchandises (bic)' },
        { rate: 0.2, label: 'Formation prof.liberale obligatoire' },
    ],
    taxationFamilyContext: {
        incomeSplittingParts: 3,
        taxableHouseholdRevenues: 24506,
        taxAllowance: 10,
    },
    saving: { mode: 'percentage', value: 20 },
    partTime: { percentage: 100 },
    dayOffContext: { unit: 'weeks', value: 5 },
};

export const parametersSlice = createSlice({
    name: 'parameters',
    initialState,
    reducers: {
        setAverageDailyRate: (state, action: PayloadAction<number>) => {
            state.averageDailyRate = action.payload;
        },
        setYear: (state, action: PayloadAction<number>) => {
            state.year = action.payload;
        },
    },
});

export const { setAverageDailyRate, setYear } = parametersSlice.actions;

export const selectParameters: (state: RootState) => ParametersState = (state: RootState) => state.parameters;

export default parametersSlice.reducer;

export type SocialContribution = {
    rate: number;
    label: string;
};

export type Saving = {
    mode: 'percentage' | 'value';
    value: number;
};
