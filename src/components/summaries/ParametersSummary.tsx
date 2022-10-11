import React, { ReactNode, useEffect, useState } from 'react';
import { Box, Card, CardContent, Collapse, Grid, IconButton, Typography, useMediaQuery } from '@mui/material';
import { useAppSelector } from '../../redux/hooks';
import { Saving, selectParameters, SocialContribution } from '../../redux/slices/ParametersSlice';
import Euro from '../formatters/Euro';
import Percentage from '../formatters/Percentage';
import calendarService from '../../services/CalendarService';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import DayFormatter from '../formatters/DayFormatter';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function ParametersSummary() {
    const parameters = useAppSelector(selectParameters);
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const mediaQuery: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

    useEffect(() => {
        if (mediaQuery) {
            setCollapsed(true);
        }
    }, [mediaQuery]);

    return (
        <Box sx={{ mt: '10px', mb: '10px' }}>
            <Box
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: '10px', mn: '10px' }}
            >
                <Typography gutterBottom variant="h5" component="div">
                    Paramètres
                </Typography>
                <IconButton onClick={() => setCollapsed((collapsed) => !collapsed)}>
                    {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </IconButton>
            </Box>
            <Collapse in={!collapsed} timeout="auto" unmountOnExit component={Box}>
                <Grid container spacing={3}>
                    <ParameterGrid>
                        <CardParameters
                            items={[
                                {
                                    title: 'Informations du freelance',
                                    parameters: [
                                        {
                                            label: 'TJM',
                                            value: <Euro cents={false}>{parameters.averageDailyRate}</Euro>,
                                        },
                                        {
                                            label: 'Temps de travail',
                                            value: <Percentage>{parameters.partTime.percentage}</Percentage>,
                                        },
                                        {
                                            label: 'Congés',
                                            value: calendarService.formatDayOffContext(parameters.dayOffContext),
                                        },

                                        {
                                            label: "Epargne d'entreprise",
                                            value: <ParameterSaving saving={parameters.saving} />,
                                        },
                                        {
                                            label: 'Jours non ouvrables',
                                            value: <DayFormatter>{parameters.nonWorkingDays}</DayFormatter>,
                                        },
                                    ],
                                },
                            ]}
                        />
                    </ParameterGrid>
                    <ParameterGrid>
                        <CardParameters
                            items={[
                                {
                                    title: 'Cotisations sociales',
                                    parameters: parameters.socialContribution.map(
                                        (socialContribution: SocialContribution) => {
                                            return {
                                                label: socialContribution.label,
                                                value: <Percentage>{socialContribution.rate}</Percentage>,
                                            };
                                        },
                                    ),
                                },
                                {
                                    title: 'Fiscalité entreprise',
                                    parameters: [
                                        { label: 'TVA', value: <Percentage>{parameters.vatRate}</Percentage> },
                                        {
                                            label: 'Abattement forfaitaire',
                                            value: <Percentage>{parameters.taxAllowance}</Percentage>,
                                        },
                                    ],
                                },
                            ]}
                        />
                    </ParameterGrid>
                    <ParameterGrid>
                        <CardParameters
                            items={[
                                {
                                    title: 'Fiscalité personnelle',
                                    parameters: [
                                        {
                                            label: 'Nombre de parts',
                                            value: parameters.taxationFamilyContext.incomeSplittingParts,
                                        },
                                        {
                                            label: 'Revenus du foyer',
                                            value: (
                                                <Euro>{parameters.taxationFamilyContext.taxableHouseholdRevenues}</Euro>
                                            ),
                                        },
                                        {
                                            label: 'Abattement forfaitaire',
                                            value: (
                                                <Percentage>{parameters.taxationFamilyContext.taxAllowance}</Percentage>
                                            ),
                                        },
                                    ],
                                },
                            ]}
                        />
                    </ParameterGrid>
                </Grid>
            </Collapse>
        </Box>
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
    items: CardParametersItemProps[];
};

function CardParameters({ items }: CardParametersProps) {
    return (
        <CardContent sx={{ p: '10px' }}>
            {items.map((itemProps: CardParametersItemProps, index) => (
                <CardParametersItem key={'item-' + index} {...itemProps} />
            ))}
        </CardContent>
    );
}

type CardParametersItemProps = {
    title: string;
    parameters: {
        label: string;
        value: ReactNode;
    }[];
};

function CardParametersItem({ title, parameters }: CardParametersItemProps) {
    return (
        <Box>
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
        </Box>
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
        titleTypographySxValue = { ...titleTypographySxValue, maxWidth: '50%' };
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

export type ParameterGridProps = {
    children: ReactNode;
};

export function ParameterGrid({ children }: ParameterGridProps) {
    return (
        <Grid item xs={12} md={4} sx={{ padding: '5px' }}>
            <Card>{children}</Card>
        </Grid>
    );
}
