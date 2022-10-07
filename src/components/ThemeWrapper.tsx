import React, { ReactNode } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';

export type ThemeWrapperProps = {
    children: ReactNode;
};

function ThemeWrapper({ children }: ThemeWrapperProps) {
    const theme = createTheme({
        typography: {
            fontSize: 13,
        },
        components: {
            MuiTableRow: {
                styleOverrides: {
                    head: {
                        color: '#495057',
                        backgroundColor: '#eff2f7',
                        fontWeight: 600,
                        borderBottomColor: '#d7dade',
                        borderBottomWidth: '2px',
                        borderBottomStyle: 'solid',
                    },
                    hover: {
                        backgroundColor: '#495057',
                    },
                    root: {
                        '&:last-child td, &:last-child th': { border: 0 },
                    },
                },
            },
            MuiTableCell: {
                styleOverrides: {
                    head: {
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#495057',
                    },
                    body: {
                        color: '#495057',
                        fontSize: '13px',
                    },
                },
            },
            MuiTableContainer: {
                styleOverrides: {
                    root: {
                        borderRadius: 5,
                    },
                },
            },
        },
    });
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default ThemeWrapper;
