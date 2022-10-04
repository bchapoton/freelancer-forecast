import React, { useMemo } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import taxesService, { IncomeTaxesResult, TaxationFamilyContext, TaxBracketResult } from '../services/TaxesService';
import Percentage from './Percentage';
import Euro from './Euro';
import ParameterBox from './ParameterBox';

export type TaxesSummaryProps = {
    referenceIncome: number;
};

function TaxesSummary({ referenceIncome }: TaxesSummaryProps) {
    const taxationFamilyContext: TaxationFamilyContext = useMemo<TaxationFamilyContext>(
        () => taxesService.getTaxationFamilyContext(),
        [],
    );
    const incomeTaxesResult: IncomeTaxesResult = useMemo<IncomeTaxesResult>(
        () => taxesService.getTaxes(referenceIncome, taxationFamilyContext),
        [referenceIncome, taxationFamilyContext],
    );
    return (
        <Paper>
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <ParameterBox title="TJM" value={<Euro cents={false}>{500}</Euro>} />
                <ParameterBox title="Nombre de parts" value={taxationFamilyContext.incomeSplittingParts + ' parts'} />
                <ParameterBox title="Revenus entreprise" value={<Euro cents={false}>{500}</Euro>} />
                <ParameterBox
                    title="Revenus famillaux"
                    value={<Euro cents={false}>{taxationFamilyContext.taxableHouseholdRevenues}</Euro>}
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
                        {incomeTaxesResult.taxesBrackets.map((taxBracketResult: TaxBracketResult) => (
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
                            <TableCell component="th" scope="row">
                                Total
                            </TableCell>
                            <TableCell align="right" colSpan={2}>
                                <Euro>{incomeTaxesResult.total}</Euro>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default TaxesSummary;
