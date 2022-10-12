import parametersReducer, {
    initialState as storeInitialState,
    ParametersState,
    selectMonth,
    setAverageDailyRate,
    setDayOffContextValue,
    setNonWorkingDays,
    setPartTimeValue,
    setSavingValue,
    setTaxAllowance,
    setTaxationFamilySplittingParts,
    setTaxationFamilyTaxableHouseholdRevenues,
    setTaxationFamilyTaxAllowance,
    setVatRate,
    setYear,
    unselectMonth,
} from './ParametersSlice';
import { DAY, MONTH } from '../../services/CalendarService';

describe('Parameters reducers', () => {
    const initialState: ParametersState = { ...storeInitialState };

    it('should handle initial state', () => {
        expect<ParametersState>(parametersReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('reducer actions', () => {
        let actual: ParametersState = parametersReducer(initialState, setAverageDailyRate(700));
        expect<number>(actual.averageDailyRate).toEqual(700);

        actual = parametersReducer(initialState, setYear(2023));
        expect<number>(actual.year).toEqual(2023);

        actual = parametersReducer(initialState, setVatRate(10));
        expect<number>(actual.vatRate).toEqual(10);

        actual = parametersReducer(initialState, setDayOffContextValue(10));
        expect<number>(actual.dayOffContext.value).toEqual(10);
        // test unit too, for now doesn't handle other unit than week, but it made for handle multiple unit
        expect<string>(actual.dayOffContext.unit).toEqual('weeks');

        actual = parametersReducer(initialState, setPartTimeValue(50));
        expect<number>(actual.partTime.percentage).toEqual(50);

        actual = parametersReducer(initialState, setTaxationFamilySplittingParts(4));
        expect<number>(actual.taxationFamilyContext.incomeSplittingParts).toEqual(4);

        actual = parametersReducer(initialState, setTaxationFamilyTaxableHouseholdRevenues(20000));
        expect<number>(actual.taxationFamilyContext.taxableHouseholdRevenues).toEqual(20000);

        actual = parametersReducer(initialState, setTaxationFamilyTaxAllowance(20));
        expect<number>(actual.taxationFamilyContext.taxAllowance).toEqual(20);

        actual = parametersReducer(initialState, setSavingValue(25));
        expect<number>(actual.saving.value).toEqual(25);
        // test mode too, for now doesn't handle other unit than percentage, but it made for handle multiple mode
        expect<string>(actual.saving.mode).toEqual('percentage');

        actual = parametersReducer(initialState, setTaxAllowance(50));
        expect<number>(actual.taxAllowance).toEqual(50);

        actual = parametersReducer(initialState, setNonWorkingDays([DAY.MONDAY]));
        expect<DAY[]>(actual.nonWorkingDays).toEqual([DAY.MONDAY]);

        // All months are selected by default
        const testMonthInitialState: ParametersState = {
            ...initialState,
            selectedMonths: [MONTH.JANUARY, MONTH.FEBRUARY],
        };
        actual = parametersReducer(testMonthInitialState, selectMonth(MONTH.AUGUST));
        expect<MONTH[]>(actual.selectedMonths).toEqual(expect.arrayContaining<MONTH>([MONTH.AUGUST]));

        actual = parametersReducer(testMonthInitialState, unselectMonth(MONTH.FEBRUARY));
        expect<DAY[]>(actual.nonWorkingDays).toEqual(expect.not.arrayContaining<MONTH>([MONTH.FEBRUARY]));
    });
});
