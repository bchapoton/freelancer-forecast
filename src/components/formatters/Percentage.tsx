import React from 'react';

export type PercentageProps = {
    children: number;
};

function Percentage({ children }: PercentageProps) {
    return <span>{children}%</span>;
}

export default Percentage;
