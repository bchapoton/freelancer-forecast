import { initialState as ParametersInitialState, ParametersState } from '../redux/slices/ParametersSlice';
import { initialState as SummariesInitialState, SummariesState } from '../redux/slices/SummariesSlice';
import { initialState as UIInitialState, UIState } from '../redux/slices/UISlice';

export class TestHelper {
    static initTestingStore(): StorePreloadedState {
        return {
            parameters: {
                ...ParametersInitialState,
                year: 2022,
            },
            summaries: SummariesInitialState,
            ui: UIInitialState,
        };
    }
}

export type StorePreloadedState = {
    parameters: ParametersState;
    summaries: SummariesState;
    ui: UIState;
};
