import React, { Fragment, ReactNode, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { ParametersState, selectParameters } from '../redux/slices/ParametersSlice';
import parametersService, { YearSummary } from '../services/ParametersService';
import { setIncomeTaxesSummary, setYearSummary } from '../redux/slices/SummariesSlice';
import taxesService, { IncomeTaxesSummary } from '../services/TaxesService';

export type ParametersProviderProps = {
    children: ReactNode;
};

function ParametersProvider({ children }: ParametersProviderProps) {
    const parameters: ParametersState = useAppSelector(selectParameters);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const yearSummary: YearSummary = parametersService.buildYearSummary(parameters);
        dispatch(setYearSummary(yearSummary));
        const incomeTaxesSummary: IncomeTaxesSummary = taxesService.getIncomeTaxesSummary(
            yearSummary.totals.revenue,
            parameters.taxAllowance,
            parameters.taxationFamilyContext,
        );
        dispatch(setIncomeTaxesSummary(incomeTaxesSummary));
    }, [dispatch, parameters]);

    return <Fragment>{children}</Fragment>;
}

export default ParametersProvider;
