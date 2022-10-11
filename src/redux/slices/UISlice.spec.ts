import summariesReducer, { initialState as storeInitialState, toggleParametersDrawer, UIState } from './UISlice';

describe('UI reducers', () => {
    const initialState: UIState = { ...storeInitialState };

    it('should handle initial state', () => {
        expect<UIState>(summariesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('reducer actions', () => {
        // initial toggled value
        let initialParametersDrawerValue: boolean = initialState.parametersDrawerOpen;

        const actual: UIState = summariesReducer(initialState, toggleParametersDrawer());
        // should be toggled
        initialParametersDrawerValue = !initialParametersDrawerValue;
        expect<boolean>(actual.parametersDrawerOpen).toEqual(initialParametersDrawerValue);
    });
});
