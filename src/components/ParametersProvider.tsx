import React, { Fragment, ReactNode, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { ParametersState, selectParameters } from '../redux/slices/ParametersSlice';
import parametersService, { YearSummary } from '../services/ParametersService';
import { setYearSummary } from '../redux/slices/FinancialSlice';

export type ParametersProviderProps = {
    children: ReactNode;
};

function ParametersProvider({ children }: ParametersProviderProps) {
    const parameters: ParametersState = useAppSelector(selectParameters);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const yearSummary: YearSummary = parametersService.buildFinancialYearSummary(parameters);
        dispatch(setYearSummary(yearSummary));
    }, [parameters]);

    return <Fragment>{children}</Fragment>;
}

export default ParametersProvider;
