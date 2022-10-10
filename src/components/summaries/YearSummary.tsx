import React, { useMemo } from 'react';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';

import Euro from '../formatters/Euro';
import { useAppSelector } from '../../redux/hooks';
import { selectParameters } from '../../redux/slices/ParametersSlice';
import { selectYearSummary } from '../../redux/slices/SummariesSlice';
import parametersService, { MonthSummary } from '../../services/ParametersService';
import { TableCellBold, TableRowFooter } from '../TableCustomComponents';
import moment from '../../helpers/MomentHelper';

function YearSummary() {
    const parameters = useAppSelector(selectParameters);
    const yearSummary = useAppSelector(selectYearSummary);

    const socialContributionRate: number = useMemo<number>(
        () => parametersService.calculateSocialContributionsRate(parameters.socialContribution),
        [parameters.socialContribution],
    );

    return (
        <Box>
            <Typography gutterBottom variant="h5" component="div">
                Facturation {parameters.year}
            </Typography>
            <Paper>
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>mois</TableCell>
                                <TableCell align="right">Jours facturés</TableCell>
                                <TableCell align="right">CA</TableCell>
                                <TableCell align="right">TVA ({parameters.vatRate}%)</TableCell>
                                <TableCell align="right">TTC</TableCell>
                                <TableCell align="right">Cotisations sociales ({socialContributionRate}%)</TableCell>
                                <TableCell align="right">Bénéfices</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {yearSummary.monthSummaries.map((monthSummary: MonthSummary) => {
                                return (
                                    <TableRow hover={true} key={monthSummary.month}>
                                        <TableCell variant="head" sx={{ textTransform: 'capitalize' }}>
                                            {moment().month(monthSummary.month).format('MMMM')}
                                        </TableCell>
                                        <TableCell align="right">{monthSummary.totalDays}</TableCell>
                                        <TableCell align="right">
                                            <Euro>{monthSummary.revenue}</Euro>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Euro>{monthSummary.vat}</Euro>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Euro>{monthSummary.includingTax}</Euro>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Euro>{monthSummary.socialContribution}</Euro>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Euro>{monthSummary.profits}</Euro>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            <TableRowFooter>
                                <TableCellBold>Totaux</TableCellBold>
                                <TableCellBold align="right">{yearSummary.totals.totalDays}</TableCellBold>
                                <TableCellBold align="right">
                                    <Euro>{yearSummary.totals.revenue}</Euro>
                                </TableCellBold>
                                <TableCellBold align="right">
                                    <Euro>{yearSummary.totals.vat}</Euro>
                                </TableCellBold>
                                <TableCellBold align="right">
                                    <Euro>{yearSummary.totals.includingTax}</Euro>
                                </TableCellBold>
                                <TableCellBold align="right">
                                    <Euro>{yearSummary.totals.socialContribution}</Euro>
                                </TableCellBold>
                                <TableCellBold align="right">
                                    <Euro>{yearSummary.totals.profits}</Euro>
                                </TableCellBold>
                            </TableRowFooter>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}

export default YearSummary;
