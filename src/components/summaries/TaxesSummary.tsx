import React, { Fragment } from 'react';
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
import { IncomeTaxesSummary, TaxBracket, TaxBracketSummary } from '../../services/TaxesService';
import Percentage from '../formatters/Percentage';
import Euro from '../formatters/Euro';
import { YearSummary } from '../../services/ParametersService';
import { useAppSelector } from '../../redux/hooks';
import { selectIncomeTaxesSummary, selectYearSummary } from '../../redux/slices/SummariesSlice';
import { ParametersState, selectParameters } from '../../redux/slices/ParametersSlice';
import { TableCellBold, TableRowFooter } from '../TableCustomComponents';
import { BoxedParameters } from './ParametersSummary';

function TaxesSummary() {
    const yearSummary: YearSummary = useAppSelector(selectYearSummary);
    const parameters: ParametersState = useAppSelector(selectParameters);
    const incomeTaxesSummary: IncomeTaxesSummary = useAppSelector(selectIncomeTaxesSummary);

    return (
        <Fragment>
            <Typography gutterBottom variant="h5" component="div">
                Impôts sur le revenu
            </Typography>
            <Paper>
                <Box sx={{ p: 2 }}>
                    <BoxedParameters
                        noWrap={false}
                        title="Revenus entreprise (net&nbsp;imposable)"
                        value={
                            <Fragment>
                                <Euro>{yearSummary.totals.revenue}</Euro> (
                                <Euro>{incomeTaxesSummary.netTaxableIncome.contractorNetTaxableIncome}</Euro>)
                            </Fragment>
                        }
                    />
                    <BoxedParameters
                        noWrap={false}
                        title="Revenus famillaux (&nbsp;net&nbsp;imposable&nbsp;)"
                        value={
                            <Fragment>
                                <Euro>{parameters.taxationFamilyContext.taxableHouseholdRevenues}</Euro> (
                                <Euro>{incomeTaxesSummary.netTaxableIncome.familyNetTaxableIncome}</Euro>)
                            </Fragment>
                        }
                    />
                    <BoxedParameters
                        noWrap={false}
                        title="Nombre de parts"
                        value={incomeTaxesSummary.netTaxableIncome.incomeSplittingParts + ' parts'}
                    />
                    <BoxedParameters
                        noWrap={false}
                        highlighted
                        title="Revenu net imposable"
                        value={<Euro>{incomeTaxesSummary.netTaxableIncome.netTaxableIncomeResult}</Euro>}
                    />
                </Box>
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Tranche imposition</TableCell>
                                <TableCell align="right">Taux imposition</TableCell>
                                <TableCell align="right">montant par tranche</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {incomeTaxesSummary.taxBracketSummaries.map((taxBracketResult: TaxBracketSummary) => (
                                <TableRow
                                    key={
                                        taxBracketResult.bracket.bottomBracket +
                                        '-' +
                                        taxBracketResult.bracket.topBracket
                                    }
                                    hover={true}
                                >
                                    <TableCell component="th" scope="row">
                                        <BracketLabel>{taxBracketResult.bracket}</BracketLabel>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Percentage>{taxBracketResult.bracket.rate}</Percentage>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Euro>{taxBracketResult.amount}</Euro>
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRowFooter>
                                <TableCellBold component="th" scope="row">
                                    Total
                                </TableCellBold>
                                <TableCellBold align="right" colSpan={2}>
                                    <Euro>{incomeTaxesSummary.total}</Euro>
                                </TableCellBold>
                            </TableRowFooter>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Fragment>
    );
}

export default TaxesSummary;

type BracketLabelProps = {
    children: TaxBracket;
};

function BracketLabel({ children }: BracketLabelProps) {
    if (!children.topBracket) {
        return (
            <Fragment>
                <span>Plus de</span>&nbsp;
                <Euro cents={false} bold>
                    {children.bottomBracket}
                </Euro>
            </Fragment>
        );
    } else if (children.bottomBracket === 0) {
        return (
            <Fragment>
                <span>Jusqu&apos;à</span>&nbsp;
                <Euro cents={false} bold>
                    {children.topBracket}
                </Euro>
            </Fragment>
        );
    }
    return (
        <Fragment>
            De&nbsp;
            <Euro cents={false} bold>
                {children.bottomBracket}
            </Euro>
            <span> à</span>&nbsp;
            <Euro cents={false} bold>
                {children.topBracket}
            </Euro>
        </Fragment>
    );
}
