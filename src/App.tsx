import React from 'react';
import YearSummary from './components/YearSummary';
import TaxesSummary from './components/TaxesSummary';
import { Container, Grid } from '@mui/material';

function App() {
    return (
        <Container>
            <Grid container direction={'column'} spacing={2}>
                <Grid item>
                    <YearSummary year={2022} socialContributionRate={22} averageDailyRate={550} />
                </Grid>
                <Grid item>
                    <TaxesSummary referenceIncome={43000} />
                </Grid>
            </Grid>
        </Container>
    );
}

export default App;
