import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface UIState {
    parametersDrawerOpen: boolean;
}

const initialState: UIState = {
    parametersDrawerOpen: false,
};

export const UISlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleParametersDrawer: (state) => {
            state.parametersDrawerOpen = !state.parametersDrawerOpen;
        },
    },
});

export const { toggleParametersDrawer } = UISlice.actions;

export const isParametersDrawerOpen: (state: RootState) => boolean = (state: RootState) =>
    state.ui.parametersDrawerOpen;

export default UISlice.reducer;
