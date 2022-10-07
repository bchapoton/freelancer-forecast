import React from 'react';
import { SwipeableDrawer } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { isParametersDrawerOpen, toggleParametersDrawer } from '../redux/slices/UISlice';

function ParametersDrawer() {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector(isParametersDrawerOpen);

    return (
        <SwipeableDrawer
            open={isOpen}
            onClose={() => dispatch(toggleParametersDrawer())}
            onOpen={() => dispatch(toggleParametersDrawer())}
            anchor="right"
        >
            here we go
        </SwipeableDrawer>
    );
}

export default ParametersDrawer;
