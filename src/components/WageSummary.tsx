import React, { Fragment, useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Euro from './Euro';
import parametersService, { YearSummary } from '../services/ParametersService';
import { useAppSelector } from '../redux/hooks';
import { selectIncomeTaxesSummary, selectYearSummary } from '../redux/slices/FinancialSlice';
import { ParametersState, selectParameters } from '../redux/slices/ParametersSlice';
import { IncomeTaxesSummary } from '../services/TaxesService';

function WageSummary() {
    const yearSummary: YearSummary = useAppSelector(selectYearSummary);
    const parameters: ParametersState = useAppSelector(selectParameters);
    const incomeTaxesResult: IncomeTaxesSummary = useAppSelector(selectIncomeTaxesSummary);

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
        <Fragment>
            <Typography gutterBottom variant="h5" component="div">
                Salaires
            </Typography>
            <Paper>
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>&nbsp;</TableCell>
                                <TableCell align="right">Mensuel lissé sur 12 mois</TableCell>
                                <TableCell align="right">Annuel</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow hover={true}>
                                <TableCell component="th" scope="row">
                                    Salaire avant impôts sur le revenu
                                </TableCell>
                                <TableCell align="right">
                                    <Euro>{values.wagesBeforeTaxesPerYear / 12}</Euro>
                                </TableCell>
                                <TableCell align="right">
                                    <Euro>{values.wagesBeforeTaxesPerYear}</Euro>
                                </TableCell>
                            </TableRow>
                            <TableRow hover={true}>
                                <TableCell component="th" scope="row">
                                    Impôts sur le revenu
                                </TableCell>
                                <TableCell align="right">
                                    <Euro>{values.incomeTaxesPerYear / 12}</Euro>
                                </TableCell>
                                <TableCell align="right">
                                    <Euro>{values.incomeTaxesPerYear}</Euro>
                                </TableCell>
                            </TableRow>
                            <TableRow hover={true}>
                                <TableCell component="th" scope="row">
                                    Salaire après impôts sur le revenu
                                </TableCell>
                                <TableCell align="right">
                                    <Euro>{values.wagesAfterTaxesPerYear / 12}</Euro>
                                </TableCell>
                                <TableCell align="right">
                                    <Euro>{values.wagesAfterTaxesPerYear}</Euro>
                                </TableCell>
                            </TableRow>
                            <TableRow hover={true}>
                                <TableCell component="th" scope="row">
                                    Epargne entreprise
                                </TableCell>
                                <TableCell align="right">
                                    <Euro>{values.savingPerYear / 12}</Euro>
                                </TableCell>
                                <TableCell align="right">
                                    <Euro>{values.savingPerYear}</Euro>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Fragment>
    );
}

export default WageSummary;

type ValuesState = {
    wagesBeforeTaxesPerYear: number;
    incomeTaxesPerYear: number;
    wagesAfterTaxesPerYear: number;
    savingPerYear: number;
};
