import summariesReducer, {
    initialState as storeInitialState,
    setIncomeTaxesSummary,
    setYearSummary,
    SummariesState,
} from './SummariesSlice';
import { YearSummary } from '../../services/ParametersService';
import { expectedIncomeTaxesSummaryAlone, expectedYearSummary } from '../../helpers/TestsCommonsParams';
import { IncomeTaxesSummary } from '../../services/TaxesService';

describe('Summaries reducers', () => {
    const initialState: SummariesState = { ...storeInitialState };

    it('should handle initial state', () => {
        expect<SummariesState>(summariesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('reducer actions', () => {
        const yearSummary: YearSummary = { ...expectedYearSummary };
        let actual: SummariesState = summariesReducer(initialState, setYearSummary(yearSummary));
        expect<YearSummary>(actual.yearSummary).toEqual(yearSummary);

        const incomeTaxesSummary: IncomeTaxesSummary = { ...expectedIncomeTaxesSummaryAlone };
        actual = summariesReducer(initialState, setIncomeTaxesSummary(incomeTaxesSummary));
        expect<IncomeTaxesSummary>(actual.incomeTaxesSummary).toEqual(incomeTaxesSummary);
    });
});
