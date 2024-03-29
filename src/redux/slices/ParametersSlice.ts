import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TaxationFamilyContext } from '../../services/TaxesService';
import { DAY, DayOffContext, MONTH, MonthsArray, PartTimeContext } from '../../services/CalendarService';

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
    nonWorkingDays: DAY[];
    selectedMonths: MONTH[];
}

export const initialState: ParametersState = {
    selectedMonths: MonthsArray,
    averageDailyRate: 650,
    year: new Date().getFullYear(),
    vatRate: 20,
    taxAllowance: 34,
    socialContribution: [
        { rate: 21.2, label: 'Prestations de services (bnc et bic) et vente de marchandises (bic)' },
        { rate: 0.2, label: 'Formation prof.liberale obligatoire' },
    ],
    taxationFamilyContext: {
        incomeSplittingParts: 1,
        taxableHouseholdRevenues: 0,
        taxAllowance: 10,
    },
    saving: { mode: 'percentage', value: 20 },
    partTime: { percentage: 100 },
    dayOffContext: { unit: 'weeks', value: 5 },
    nonWorkingDays: [DAY.SATURDAY, DAY.SUNDAY],
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
        setVatRate: (state, action: PayloadAction<number>) => {
            state.vatRate = action.payload;
        },
        setDayOffContextValue: (state, action: PayloadAction<number>) => {
            state.dayOffContext.value = action.payload;
        },
        setPartTimeValue: (state, action: PayloadAction<number>) => {
            state.partTime.percentage = action.payload;
        },
        setTaxationFamilySplittingParts: (state, action: PayloadAction<number>) => {
            state.taxationFamilyContext.incomeSplittingParts = action.payload;
        },
        setTaxationFamilyTaxableHouseholdRevenues: (state, action: PayloadAction<number>) => {
            state.taxationFamilyContext.taxableHouseholdRevenues = action.payload;
        },
        setTaxationFamilyTaxAllowance: (state, action: PayloadAction<number>) => {
            state.taxationFamilyContext.taxAllowance = action.payload;
        },
        setSavingValue: (state, action: PayloadAction<number>) => {
            state.saving.value = action.payload;
        },
        setTaxAllowance: (state, action: PayloadAction<number>) => {
            state.taxAllowance = action.payload;
        },
        setNonWorkingDays: (state, action: PayloadAction<DAY[]>) => {
            state.nonWorkingDays = action.payload;
        },
        unselectMonth: (state, action: PayloadAction<MONTH>) => {
            state.selectedMonths = state.selectedMonths.filter((month: MONTH) => !(month === action.payload));
        },
        selectMonth: (state, action: PayloadAction<MONTH>) => {
            if (state.selectedMonths.indexOf(action.payload) === -1) {
                state.selectedMonths.push(action.payload);
            }
        },
    },
});

export const {
    setAverageDailyRate,
    setYear,
    setVatRate,
    setDayOffContextValue,
    setPartTimeValue,
    setTaxationFamilySplittingParts,
    setTaxationFamilyTaxableHouseholdRevenues,
    setTaxationFamilyTaxAllowance,
    setSavingValue,
    setTaxAllowance,
    setNonWorkingDays,
    unselectMonth,
    selectMonth,
} = parametersSlice.actions;

export const selectParameters: (state: RootState) => ParametersState = (state: RootState) => state.parameters;

export default parametersSlice.reducer;

export type SocialContribution = {
    rate: number;
    label: string;
};

export type Saving = {
    mode: 'percentage';
    value: number;
};
