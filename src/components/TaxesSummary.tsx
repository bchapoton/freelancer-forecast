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
import { IncomeTaxesSummary, TaxBracketSummary } from '../services/TaxesService';
import Percentage from './Percentage';
import Euro from './Euro';
import { YearSummary } from '../services/ParametersService';
import { useAppSelector } from '../redux/hooks';
import { selectIncomeTaxesSummary, selectYearSummary } from '../redux/slices/FinancialSlice';
import { ParametersState, selectParameters } from '../redux/slices/ParametersSlice';
import { TableCellBold, TableRowFooter } from './TableCustomComponents';
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
                        title="Revenus entreprise ( net imposable )"
                        value={
                            <Fragment>
                                <Euro>{yearSummary.totals.revenue}</Euro>&nbsp;(&nbsp;
                                <Euro>{incomeTaxesSummary.netTaxableIncome.contractorNetTaxableIncome}</Euro>&nbsp;)
                            </Fragment>
                        }
                    />
                    <BoxedParameters
                        noWrap={false}
                        title="Revenus famillaux ( net imposable )"
                        value={
                            <Fragment>
                                <Euro>{parameters.taxationFamilyContext.taxableHouseholdRevenues}</Euro>&nbsp;(&nbsp;
                                <Euro>{incomeTaxesSummary.netTaxableIncome.familyNetTaxableIncome}</Euro>
                                &nbsp;)
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
                                        <Euro cents={false}>{taxBracketResult.bracket.bottomBracket}</Euro>
                                        <span> - </span>
                                        <Euro cents={false}>{taxBracketResult.bracket.topBracket}</Euro>
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
