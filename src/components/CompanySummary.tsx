import React, { useEffect, useMemo, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import taxesService, { IncomeTaxesSummary, TaxationFamilyContext } from '../services/TaxesService';
import Euro from './Euro';
import parametersService, { YearSummary } from '../services/ParametersService';
import { useAppSelector } from '../redux/hooks';
import { selectYearSummary } from '../redux/slices/FinancialSlice';
import { ParametersState, selectParameters } from '../redux/slices/ParametersSlice';

function CompanySummary() {
    const yearSummary: YearSummary = useAppSelector(selectYearSummary);
    const parameters: ParametersState = useAppSelector(selectParameters);

    const taxationFamilyContext: TaxationFamilyContext = parameters.taxationFamilyContext;

    const incomeTaxesResult: IncomeTaxesSummary = useMemo<IncomeTaxesSummary>(
        () => taxesService.getTaxes(yearSummary.totals.revenue, taxationFamilyContext),
        [yearSummary, taxationFamilyContext],
    );

    const [values, setValues] = useState<ValuesState>({
        wagesBeforeTaxesPerYear: 0,
        savingPerYear: 0,
        incomeTaxesPerYear: 0,
        wagesAfterTaxesPerYear: 0,
    });

    useEffect(() => {
        const saving = parametersService.calculateSaving(
            yearSummary.totals.profits - incomeTaxesResult.total,
            parameters.saving,
        );
        setValues({
            wagesBeforeTaxesPerYear: yearSummary.totals.profits - saving,
            incomeTaxesPerYear: incomeTaxesResult.total,
            wagesAfterTaxesPerYear: yearSummary.totals.profits - incomeTaxesResult.total - saving,
            savingPerYear: saving,
        });
    }, [yearSummary, incomeTaxesResult, parameters]);

    return (
        <Paper>
            <TableContainer>
                <Table size="small">
                    <TableBody>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                Salaire avant IR mensuel lissé
                            </TableCell>
                            <TableCell align="right">
                                <Euro>{values.wagesBeforeTaxesPerYear / 12}</Euro>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                Impôts mensuels lissés
                            </TableCell>
                            <TableCell align="right">
                                <Euro>{values.incomeTaxesPerYear / 12}</Euro>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                Salaire après IR mensuel lissé
                            </TableCell>
                            <TableCell align="right">
                                <Euro>{values.wagesAfterTaxesPerYear / 12}</Euro>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                Epargne mensuelle lissée
                            </TableCell>
                            <TableCell align="right">
                                <Euro>{values.savingPerYear / 12}</Euro>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                Epargne annuelle
                            </TableCell>
                            <TableCell align="right">
                                <Euro>{values.savingPerYear}</Euro>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                Total salaire annuel
                            </TableCell>
                            <TableCell align="right">
                                <Euro>{values.wagesAfterTaxesPerYear}</Euro>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default CompanySummary;

type ValuesState = {
    wagesBeforeTaxesPerYear: number;
    incomeTaxesPerYear: number;
    wagesAfterTaxesPerYear: number;
    savingPerYear: number;
};
