import React from 'react';
import YearSummary from './components/YearSummary';
import TaxesSummary from './components/TaxesSummary';
import { Container, Grid } from '@mui/material';
import ParametersProvider from './components/ParametersProvider';
import ThemeWrapper from './components/ThemeWrapper';
import ParametersSummary from './components/ParametersSummary';
import WageSummary from './components/WageSummary';
import AppFooter from './components/AppFooter';

function App() {
    return (
        <ThemeWrapper>
            <ParametersProvider>
                <Container>
                    <Grid container direction={'column'} spacing={2} columnSpacing={2} sx={{ mt: '10px', mb: '10px' }}>
                        <Grid item>
                            <ParametersSummary />
                        </Grid>
                        <Grid item>
                            <YearSummary />
                        </Grid>
                        <Grid item>
                            <TaxesSummary />
                        </Grid>
                        <Grid item>
                            <WageSummary />
                        </Grid>
                    </Grid>
                </Container>
                <AppFooter />
            </ParametersProvider>
        </ThemeWrapper>
    );
}

export default App;
