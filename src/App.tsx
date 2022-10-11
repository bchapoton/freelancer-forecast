import React from 'react';
import YearSummary from './components/summaries/YearSummary';
import TaxesSummary from './components/summaries/TaxesSummary';
import { Box, Container } from '@mui/material';
import ParametersProvider from './components/ParametersProvider';
import ThemeWrapper from './components/ThemeWrapper';
import ParametersSummary from './components/summaries/ParametersSummary';
import WageSummary from './components/summaries/WageSummary';
import AppFooter from './components/AppFooter';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
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
                <AppBar position="fixed" sx={{ bgcolor: '#FFF' }}>
                    <Toolbar>
                        <img src="/logo-no-background-small.png" height={40} alt="Freelancer forecast logo" />
                        <Box sx={{ flexGrow: 1 }}>&nbsp;</Box>
                        <IconButton onClick={() => dispatch(toggleParametersDrawer())}>
                            <SettingsOutlinedIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Container sx={{ maxWidth: '100%', overflowX: 'auto', mt: '65px' }}>
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

const AppContainer = styled(Box)({
    marginTop: '10px',
    marginBottom: '10px',
});

const ItemContainer = styled(Box)({
    marginTop: '5px',
    marginBottom: '5px',
    maxWidth: '100%',
});
