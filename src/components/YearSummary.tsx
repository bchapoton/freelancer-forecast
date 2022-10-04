import React, { useMemo } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import taxesService from '../services/TaxesService';
import moment from 'moment';
import Euro from './Euro';
import calendarService, { OpenDayPerMonth, OpenDayPerYear } from '../services/CalendarService';

export type YearSummaryProps = {
    year: number;
    averageDailyRate: number;
    socialContributionRate: number;
};

function YearSummary({ year, averageDailyRate, socialContributionRate }: YearSummaryProps) {
    const openDaysYear: OpenDayPerYear = useMemo<OpenDayPerYear>(
        () => calendarService.buildOpenDayPerYear(year),
        [year],
    );
    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>mois</TableCell>
                        <TableCell align="right">Jours ouvrés</TableCell>
                        <TableCell align="right">CA</TableCell>
                        <TableCell align="right">TVA</TableCell>
                        <TableCell align="right">TTC</TableCell>
                        <TableCell align="right">Côtisations sociales</TableCell>
                        <TableCell align="right">Bénéfices</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {openDaysYear.openDayPerMonths.map((openDayPerMonth: OpenDayPerMonth) => {
                        const totalDays = openDayPerMonth.total;
                        const revenue = totalDays * averageDailyRate;
                        const vat = taxesService.getVAT(revenue);
                        const includingTax: number = revenue + vat;
                        const socialContribution = (socialContributionRate / 100) * revenue;
                        const profits = revenue - socialContribution;
                        return (
                            <TableRow
                                key={openDayPerMonth.month}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {moment(`1/${openDayPerMonth.month + 1}/${year}`, 'DD/MM/YYYY').format('MMMM')}
                                </TableCell>
                                <TableCell align="right">{totalDays}</TableCell>
                                <TableCell align="right">
                                    <Euro>{revenue}</Euro>
                                </TableCell>
                                <TableCell align="right">
                                    <Euro>{vat}</Euro>
                                </TableCell>
                                <TableCell align="right">
                                    <Euro>{includingTax}</Euro>
                                </TableCell>
                                <TableCell align="right">
                                    <Euro>{socialContribution}</Euro>
                                </TableCell>
                                <TableCell align="right">
                                    <Euro>{profits}</Euro>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default YearSummary;
