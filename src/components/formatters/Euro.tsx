import React, { useMemo } from 'react';
import { Box } from '@mui/material';

export type EuroProps = {
    children?: number;
    cents?: boolean;
    bold?: boolean;
};

function Euro({ children, cents = true, bold = false }: EuroProps) {
    const displayedValue: string | undefined = useMemo(() => {
        if (children === undefined) return undefined;
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: cents ? 2 : 0,
        }).format(children);
    }, [children]);

    if (!displayedValue) return null;
    return (
        <Box component="span" sx={{ fontWeight: bold ? 'bold' : 'normal' }}>
            {displayedValue}
        </Box>
    );
}

export default Euro;
