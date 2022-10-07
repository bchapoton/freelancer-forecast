import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import { styled } from '@mui/system';

function AppFooter() {
    return (
        <Box sx={{ padding: '5px 0', display: 'flex', justifyContent: 'center' }}>
            <FooterTypography>outil&nbsp;proposé&nbsp;par&nbsp;</FooterTypography>
            <FooterLink href="#" label="CHAPOTON Benjamin" />
            <FooterTypography>&nbsp;-&nbsp;</FooterTypography>
            <FooterLink href="#" label="github" />
        </Box>
    );
}

export default AppFooter;

type FooterLinkProps = {
    href: string;
    label: string;
};

function FooterLink({ href, label }: FooterLinkProps) {
    return (
        <Link href={href} underline="hover" sx={{ color: '#74788d', fontSize: 13 }}>
            {label}
        </Link>
    );
}

const FooterTypography = styled(Typography)({
    color: '#74788d',
    fontSize: 13,
});
