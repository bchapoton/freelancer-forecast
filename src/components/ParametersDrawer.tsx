import React, { useCallback } from 'react';
import { Box, IconButton, SwipeableDrawer, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { isParametersDrawerOpen, toggleParametersDrawer } from '../redux/slices/UISlice';
import {
    ParametersState,
    selectParameters,
    setAverageDailyRate,
    setDayOffContextValue,
    setPartTimeValue,
    setSavingValue,
    setTaxAllowance,
    setTaxationFamilySplittingParts,
    setTaxationFamilyTaxableHouseholdRevenues,
    setTaxationFamilyTaxAllowance,
    setVatRate,
} from '../redux/slices/ParametersSlice';
import { EuroField, IncomingSplittingPartsField, PercentageField, WeeksNumberField } from './FormFields';
import CloseIcon from '@mui/icons-material/Close';
import packageJSON from '../../package.json';

function ParametersDrawer() {
    const dispatch = useAppDispatch();
    const toggleDrawer = useCallback(() => dispatch(toggleParametersDrawer()), [dispatch]);
    const isOpen = useAppSelector(isParametersDrawerOpen);

    const parameters: ParametersState = useAppSelector(selectParameters);
    return (
        <SwipeableDrawer open={isOpen} onClose={() => toggleDrawer()} onOpen={() => toggleDrawer()} anchor="right">
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                <IconButton onClick={() => toggleDrawer()}>
                    <CloseIcon fontSize="large" />
                </IconButton>
            </Box>
            <Box sx={{ maxWidth: '300px', m: '5px 30px' }}>
                <Typography gutterBottom variant="h5" component="div">
                    Paramètres
                </Typography>
                <EuroField
                    label="TJM"
                    dispatchAction={setAverageDailyRate}
                    defaultValue={parameters.averageDailyRate}
                />
                <PercentageField
                    label="Temps de travail"
                    dispatchAction={setPartTimeValue}
                    defaultValue={parameters.partTime.percentage}
                />
                <WeeksNumberField
                    dispatchAction={setDayOffContextValue}
                    label="Congés"
                    defaultValue={parameters.dayOffContext.value}
                />
                <PercentageField
                    label="Epargne d'entreprise"
                    dispatchAction={setSavingValue}
                    defaultValue={parameters.saving.value}
                />
                <Typography gutterBottom variant="h5" component="div">
                    Fiscalité entreprise
                </Typography>
                <PercentageField label="TVA" dispatchAction={setVatRate} defaultValue={parameters.vatRate} />
                <PercentageField
                    label="Abattement fiscal"
                    dispatchAction={setTaxAllowance}
                    defaultValue={parameters.taxAllowance}
                />
                <Typography gutterBottom variant="h5" component="div">
                    Contexte fiscal personnel
                </Typography>
                <IncomingSplittingPartsField
                    dispatchAction={setTaxationFamilySplittingParts}
                    label="Nombre de part(s)"
                    defaultValue={parameters.taxationFamilyContext.incomeSplittingParts}
                />
                <EuroField
                    label="Revenus du foyer"
                    dispatchAction={setTaxationFamilyTaxableHouseholdRevenues}
                    defaultValue={parameters.taxationFamilyContext.taxableHouseholdRevenues}
                />
                <PercentageField
                    label="Abattement fiscal"
                    dispatchAction={setTaxationFamilyTaxAllowance}
                    defaultValue={parameters.taxationFamilyContext.taxAllowance}
                />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="caption">v&nbsp;{packageJSON.version}</Typography>
            </Box>
        </SwipeableDrawer>
    );
}

export default ParametersDrawer;
