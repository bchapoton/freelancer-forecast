import React, { Fragment, FunctionComponent, useCallback, useMemo } from 'react';
import {
    Box,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Theme,
    Typography,
} from '@mui/material';

import ForestIcon from '@mui/icons-material/Forest';
import WorkIcon from '@mui/icons-material/Work';

import Euro from '../formatters/Euro';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectMonth, selectParameters, unselectMonth } from '../../redux/slices/ParametersSlice';
import { selectYearSummary } from '../../redux/slices/SummariesSlice';
import parametersService, { MonthSummary } from '../../services/ParametersService';
import { TableCellBold, TableRowFooter } from '../TableCustomComponents';
import moment from '../../helpers/MomentHelper';
import calendarService, { MONTH } from '../../services/CalendarService';
import { SxProps } from '@mui/system';
import SvgIcon, { SvgIconTypeMap } from '@mui/material/SvgIcon/SvgIcon';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { SvgIconClasses } from '@mui/material/SvgIcon/svgIconClasses';

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
                                <TableCell>&nbsp;</TableCell>
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
                                    <TableRow
                                        hover={true}
                                        key={monthSummary.month}
                                        // reverse the selection, we will use the selected props to unselect value visually
                                        selected={
                                            !calendarService.isMonthSelected(
                                                monthSummary.month,
                                                parameters.selectedMonths,
                                            )
                                        }
                                    >
                                        <TableCell padding="checkbox">
                                            <MonthToggle
                                                month={monthSummary.month}
                                                selectedMonth={parameters.selectedMonths}
                                            />
                                        </TableCell>
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
                                <TableCellBold colSpan={2}>Totaux</TableCellBold>
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

type MonthToggleProps = {
    month: MONTH;
    selectedMonth: MONTH[];
};

function MonthToggle({ month, selectedMonth }: MonthToggleProps) {
    const dispatch = useAppDispatch();
    const isSelected: boolean = useMemo(
        () => calendarService.isMonthSelected(month, selectedMonth),
        [month, selectedMonth],
    );
    const iconComponent: ReactJSXElement = isSelected ? <WorkIcon /> : <ForestIcon sx={{ color: 'green' }} />;

    const handleOnClick = useCallback(() => {
        if (isSelected) dispatch(unselectMonth(month));
        else dispatch(selectMonth(month));
    }, [isSelected, month]);

    return (
        <Fragment>
            <IconButton onClick={handleOnClick}>{iconComponent}</IconButton>
        </Fragment>
    );
}
