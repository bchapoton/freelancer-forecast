import React from 'react';
import YearSummary from './components/YearSummary';
import TaxesSummary from './components/TaxesSummary';
import { Box, Container } from '@mui/material';
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
import { styled } from '@mui/system';

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
                <Container sx={{ maxWidth: '100%', overflowX: 'auto' }}>
                    <AppContainer>
                        <ItemContainer>
                            <ParametersSummary />
                        </ItemContainer>
                        <ItemContainer>
                            <YearSummary />
                        </ItemContainer>
                        <ItemContainer>
                            <TaxesSummary />
                        </ItemContainer>
                        <ItemContainer>
                            <WageSummary />
                        </ItemContainer>
                    </AppContainer>
                </Container>
                <AppFooter />
                <ParametersDrawer />
            </ParametersProvider>
        </ThemeWrapper>
    );
}

export default App;

const AppContainer = styled(Typography)({
    marginTop: '10px',
    marginBottom: '10px',
});

const ItemContainer = styled(Typography)({
    marginTop: '5px',
    marginBottom: '5px',
    maxWidth: '100%',
    overflowX: 'auto',
});
