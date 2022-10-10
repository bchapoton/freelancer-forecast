import React, { Fragment } from 'react';

export type EuroProps = {
    children?: number;
    cents?: boolean;
};

function Euro({ children, cents = true }: EuroProps) {
    if (!children && children !== 0) return <Fragment />;
    return (
        <span>
            {new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'EUR',
                maximumFractionDigits: cents ? 2 : 0,
            }).format(children)}
        </span>
    );
}

export default Euro;
