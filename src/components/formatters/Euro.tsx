import React, { Fragment } from 'react';
import { Box } from '@mui/material';

export type EuroProps = {
    children?: number;
    cents?: boolean;
    bold?: boolean;
};

function Euro({ children, cents = true, bold = false }: EuroProps) {
    if (!children && children !== 0) return <Fragment />;
    return (
        <Box component="span" sx={{ fontWeight: bold ? 'bold' : 'normal' }}>
            {new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'EUR',
                maximumFractionDigits: cents ? 2 : 0,
            }).format(children)}
        </Box>
    );
}

export default Euro;
