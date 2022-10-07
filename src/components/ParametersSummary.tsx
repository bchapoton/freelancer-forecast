import React, { Fragment, ReactNode } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { useAppSelector } from '../redux/hooks';
import { Saving, selectParameters, SocialContribution } from '../redux/slices/ParametersSlice';
import Euro from './Euro';
import Percentage from './Percentage';
import calendarService from '../services/CalendarService';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import DayFormatter from './DayFormatter';

function ParametersSummary() {
    const parameters = useAppSelector(selectParameters);

    return (
        <Fragment>
            <Typography gutterBottom variant="h5" component="div">
                Paramètres
            </Typography>
            <BoxedParametersContainer>
                <CardParameters
                    title="Informations du freelance"
                    parameters={[
                        { label: 'TJM', value: <Euro cents={false}>{parameters.averageDailyRate}</Euro> },
                        { label: 'Temps de travail', value: <Percentage>{parameters.partTime.percentage}</Percentage> },
                        {
                            label: 'Congés',
                            value: calendarService.formatDayOffContext(parameters.dayOffContext),
                        },
                        { label: 'TVA', value: <Percentage>{parameters.vatRate}</Percentage> },
                        { label: 'Abattement fiscal', value: <Percentage>{parameters.taxAllowance}</Percentage> },
                        { label: "Epargne d'entreprise", value: <ParameterSaving saving={parameters.saving} /> },
                        {
                            label: 'Jours non ouvrable',
                            value: <DayFormatter>{parameters.nonWorkingDays}</DayFormatter>,
                        },
                    ]}
                />
                <CardParameters
                    title="Cotisations sociales"
                    parameters={parameters.socialContribution.map((socialContribution: SocialContribution) => {
                        return {
                            label: socialContribution.label,
                            value: <Percentage>{socialContribution.rate}</Percentage>,
                        };
                    })}
                />
                <CardParameters
                    title="Contexte familial fiscal"
                    parameters={[
                        { label: 'Nombre de parts', value: parameters.taxationFamilyContext.incomeSplittingParts },
                        {
                            label: 'Revenus du foyer',
                            value: <Euro>{parameters.taxationFamilyContext.taxableHouseholdRevenues}</Euro>,
                        },
                        {
                            label: 'Abattement fiscal',
                            value: <Percentage>{parameters.taxationFamilyContext.taxAllowance}</Percentage>,
                        },
                    ]}
                />
            </BoxedParametersContainer>
        </Fragment>
    );
}

export default ParametersSummary;

type SavingProps = {
    saving: Saving;
};

function ParameterSaving({ saving }: SavingProps) {
    if (saving.mode === 'percentage') return <Percentage>{saving.value}</Percentage>;
    else return <Euro>{saving.value}</Euro>;
}

type CardParametersProps = {
    title: string;
    parameters: {
        label: string;
        value: ReactNode;
    }[];
};

function CardParameters({ title, parameters }: CardParametersProps) {
    return (
        <Card>
            <CardContent sx={{ p: '10px' }}>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ fontSize: '1.2rem', fontWeight: 600, color: '#33383d' }}
                >
                    {title}
                </Typography>
                {parameters.map((parameter, index) => (
                    <BoxedParameters key={'card-parameter' + index} title={parameter.label} value={parameter.value} />
                ))}
            </CardContent>
        </Card>
    );
}

export type BoxedParametersProps = {
    title: ReactNode;
    value: ReactNode;
    noWrap?: boolean;
    highlighted?: boolean;
};

export function BoxedParameters({ title, value, noWrap = true, highlighted = false }: BoxedParametersProps) {
    let titleTypographySxValue: SxProps<Theme> = {
        fontWeight: 600,
        fontSize: 13,
        color: '#495057',
        width: '50%',
    };

    if (noWrap) {
        titleTypographySxValue = { ...titleTypographySxValue, maxWidth: '250px', minWidth: '150px' };
    }

    let boxSxValue: SxProps<Theme> = {
        display: 'flex',
    };
    if (highlighted) {
        boxSxValue = {
            ...boxSxValue,
            backgroundColor: '#f8f9fa',
            borderTopStyle: 'solid',
            borderTopWidth: 1,
            borderTopColor: '#d7dade',
        };
    }

    return (
        <Box sx={boxSxValue}>
            <Typography noWrap={noWrap} variant="subtitle2" sx={titleTypographySxValue} component={'div'}>
                {title}
            </Typography>
            <Typography variant="body2" component={'div'} sx={{ width: '50%', textAlign: 'right' }}>
                {value}
            </Typography>
        </Box>
    );
}

export type BoxedParametersContainerProps = {
    children: ReactNode;
};

export function BoxedParametersContainer({ children }: BoxedParametersContainerProps) {
    return <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>{children}</Box>;
}
