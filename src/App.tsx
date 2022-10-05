import React from 'react';
import YearSummary from './components/YearSummary';
import TaxesSummary from './components/TaxesSummary';
import { Container, Grid } from '@mui/material';
import ParametersProvider from './components/ParametersProvider';
import CompanySummary from './components/CompanySummary';

function App() {
    return (
        <ParametersProvider>
            <Container>
                <Grid container direction={'column'} spacing={2} columnSpacing={2} sx={{ mt: '10px', mb: '10px' }}>
                    <Grid item>
                        <YearSummary />
                    </Grid>
                    <Grid item>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TaxesSummary />
                            </Grid>
                            <Grid item xs={6}>
                                <CompanySummary />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </ParametersProvider>
    );
}

export default App;
