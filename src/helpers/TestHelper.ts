import { initialState as ParametersInitialState, ParametersState } from '../redux/slices/ParametersSlice';
import { SummariesState } from '../redux/slices/SummariesSlice';
import { initialState as UIInitialState, UIState } from '../redux/slices/UISlice';
import parametersService from '../services/ParametersService';
import taxesService from '../services/TaxesService';

export class TestHelper {
    static initTestingStore(): StorePreloadedState {
        const parametersState = ParametersInitialState;
        const yearSummary = parametersService.buildYearSummary(parametersState);
        return {
            parameters: {
                ...parametersState,
                year: 2022,
            },
            summaries: {
                yearSummary,
                incomeTaxesSummary: taxesService.getIncomeTaxesSummary(
                    yearSummary.totals.revenue,
                    parametersState.taxAllowance,
                    parametersState.taxationFamilyContext,
                ),
            },
            ui: UIInitialState,
        };
    }
}

export type StorePreloadedState = {
    parameters: ParametersState;
    summaries: SummariesState;
    ui: UIState;
};
