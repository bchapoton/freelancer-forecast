import React, { ReactNode, useMemo } from 'react';
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
import moment from 'moment';
import Euro from './Euro';
import { useAppSelector } from '../redux/hooks';
import { selectParameters } from '../redux/slices/ParametersSlice';
import { selectYearSummary } from '../redux/slices/FinancialSlice';
import parametersService, { MonthSummary } from '../services/ParametersService';
import TableCellBold from './TableCellBold';
import Percentage from './Percentage';

function YearSummary() {
    const parameters = useAppSelector(selectParameters);
    const yearSummary = useAppSelector(selectYearSummary);

    const socialContributionRate: number = useMemo<number>(
        () => parametersService.calculateSocialContributionsRate(parameters.socialContribution),
        [parameters.socialContribution],
    );

    return (
        <Paper>
            <Typography sx={{ flex: '1 1 100%' }} variant="h6" component="div">
                Résumé {parameters.year}
            </Typography>
            <BoxedParametersContainer>
                <BoxedParameters
                    title="Taux journalier moyen"
                    value={<Euro cents={false}>{parameters.averageDailyRate}</Euro>}
                />
                <BoxedParameters
                    title="Temps de travail"
                    value={<Percentage>{parameters.partTime.percentage}</Percentage>}
                />
                <BoxedParameters
                    title="Congés"
                    value={parameters.dayOffContext.value + ' ' + parameters.dayOffContext.unit}
                />
            </BoxedParametersContainer>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCellBold>mois</TableCellBold>
                            <TableCellBold align="right">Jours ouvrés</TableCellBold>
                            <TableCellBold align="right">CA</TableCellBold>
                            <TableCellBold align="right">TVA ({parameters.vatRate}%)</TableCellBold>
                            <TableCellBold align="right">TTC</TableCellBold>
                            <TableCellBold align="right">
                                Côtisations sociales ({socialContributionRate}%)
                            </TableCellBold>
                            <TableCellBold align="right">Bénéfices</TableCellBold>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {yearSummary.monthSummaries.map((monthSummary: MonthSummary) => {
                            return (
                                <TableRow
                                    key={monthSummary.month}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {moment(`1/${monthSummary.month + 1}/${parameters.year}`, 'DD/MM/YYYY').format(
                                            'MMMM',
                                        )}
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
                        <TableRow>
                            <TableCellBold component="th" scope="row">
                                Totaux
                            </TableCellBold>
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
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default YearSummary;

type BoxedParametersProps = {
    title: ReactNode;
    value: ReactNode;
};

function BoxedParameters({ title, value }: BoxedParametersProps) {
    return (
        <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                {title}
            </Typography>
            <Typography variant="body2">{value}</Typography>
        </Box>
    );
}

type BoxedParametersContainerProps = {
    children: ReactNode;
};

function BoxedParametersContainer({ children }: BoxedParametersContainerProps) {
    return <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>{children}</Box>;
}
