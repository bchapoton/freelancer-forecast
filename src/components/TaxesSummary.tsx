import React, { useMemo } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import taxesService, { IncomeTaxesSummary, TaxationFamilyContext, TaxBracketSummary } from '../services/TaxesService';
import Percentage from './Percentage';
import Euro from './Euro';
import ParameterBox from './ParameterBox';
import { YearSummary } from '../services/ParametersService';
import { useAppSelector } from '../redux/hooks';
import { selectYearSummary } from '../redux/slices/FinancialSlice';
import { ParametersState, selectParameters } from '../redux/slices/ParametersSlice';
import TableCellBold from './TableCellBold';

function TaxesSummary() {
    const yearSummary: YearSummary = useAppSelector(selectYearSummary);
    const parameters: ParametersState = useAppSelector(selectParameters);

    const taxationFamilyContext: TaxationFamilyContext = parameters.taxationFamilyContext;

    const incomeTaxesResult: IncomeTaxesSummary = useMemo<IncomeTaxesSummary>(
        () => taxesService.getTaxes(yearSummary.totals.revenue, taxationFamilyContext),
        [yearSummary, taxationFamilyContext],
    );

    return (
        <Paper>
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <ParameterBox title="TJM" value={<Euro cents={false}>{parameters.averageDailyRate}</Euro>} />
                <ParameterBox
                    title="Revenus entreprise"
                    value={<Euro cents={false}>{yearSummary?.totals.revenue}</Euro>}
                />
                <ParameterBox title="Nombre de parts" value={taxationFamilyContext.incomeSplittingParts + ' parts'} />
                <ParameterBox
                    title="Revenus famillaux"
                    value={<Euro cents={false}>{taxationFamilyContext.taxableHouseholdRevenues}</Euro>}
                />
            </Box>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCellBold>Tranche imposition</TableCellBold>
                            <TableCellBold align="right">Taux imposition</TableCellBold>
                            <TableCellBold align="right">montant par tranche</TableCellBold>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {incomeTaxesResult.taxesBrackets.map((taxBracketResult: TaxBracketSummary) => (
                            <TableRow
                                key={taxBracketResult.bracket.bottomBracket + '-' + taxBracketResult.bracket.topBracket}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Euro cents={false}>{taxBracketResult.bracket.bottomBracket}</Euro>
                                    <span> - </span>
                                    <Euro cents={false}>{taxBracketResult.bracket.topBracket}</Euro>
                                </TableCell>
                                <TableCell align="right">
                                    <Percentage>{taxBracketResult.bracket.rate}</Percentage>
                                </TableCell>
                                <TableCell align="right">
                                    <Euro>{taxBracketResult.bracketAmount}</Euro>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCellBold component="th" scope="row">
                                Total
                            </TableCellBold>
                            <TableCellBold align="right" colSpan={2}>
                                <Euro>{incomeTaxesResult.total}</Euro>
                            </TableCellBold>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default TaxesSummary;
