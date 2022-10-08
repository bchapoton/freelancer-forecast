import React from 'react';
import { Box, SwipeableDrawer, Typography } from '@mui/material';
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

function ParametersDrawer() {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector(isParametersDrawerOpen);

    const parameters: ParametersState = useAppSelector(selectParameters);
    return (
        <SwipeableDrawer
            open={isOpen}
            onClose={() => dispatch(toggleParametersDrawer())}
            onOpen={() => dispatch(toggleParametersDrawer())}
            anchor="right"
        >
            <Box sx={{ width: '400px', p: 5 }}>
                <Typography gutterBottom variant="h5" component="div">
                    Informations entreprise
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
                <PercentageField label="TVA" dispatchAction={setVatRate} defaultValue={parameters.vatRate} />
                <PercentageField
                    label="Abattement fiscal"
                    dispatchAction={setTaxAllowance}
                    defaultValue={parameters.taxAllowance}
                />
                <PercentageField
                    label="Epargne d'entreprise"
                    dispatchAction={setSavingValue}
                    defaultValue={parameters.saving.value}
                />
                <Typography gutterBottom variant="h5" component="div">
                    Contexte familial fiscal
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
        </SwipeableDrawer>
    );
}

export default ParametersDrawer;
