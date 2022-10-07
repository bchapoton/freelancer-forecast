import React from 'react';
import YearSummary from './components/YearSummary';
import TaxesSummary from './components/TaxesSummary';
import { Box, Container, Grid } from '@mui/material';
import ParametersProvider from './components/ParametersProvider';
import ThemeWrapper from './components/ThemeWrapper';
import ParametersSummary from './components/ParametersSummary';
import WageSummary from './components/WageSummary';
import AppFooter from './components/AppFooter';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useAppDispatch } from './redux/hooks';
import { toggleParametersDrawer } from './redux/slices/UISlice';
import ParametersDrawer from './components/ParametersDrawer';

function App() {
    const dispatch = useAppDispatch();
    return (
        <ThemeWrapper>
            <ParametersProvider>
                <AppBar position="sticky" sx={{ bgcolor: '#FFF' }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ mr: 2, color: '#000' }}>
                            Freelancer
                        </Typography>
                        <Box sx={{ flexGrow: 1 }}>&nbsp;</Box>
                        <IconButton onClick={() => dispatch(toggleParametersDrawer())}>
                            <SettingsOutlinedIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
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
                <ParametersDrawer />
            </ParametersProvider>
        </ThemeWrapper>
    );
}

export default App;
