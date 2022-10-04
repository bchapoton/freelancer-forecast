import React from 'react';
import { Box } from '@mui/material';

export type ParameterBoxProps = {
    title: string;
    value: React.ReactElement | string;
};

function ParameterBox({ title, value }: ParameterBoxProps) {
    return (
        <Box
            sx={{
                p: 2,
            }}
        >
            <Box>{title}</Box>
            <Box>{value}</Box>
        </Box>
    );
}

export default ParameterBox;
