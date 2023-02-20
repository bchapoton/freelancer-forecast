import React, { useMemo } from 'react';
import calendarService, { DAY } from '../../services/CalendarService';

export type DayFormatterProps = {
    children: DAY[];
};

function DayFormatter({ children }: DayFormatterProps) {
    const daysFormatted: string = useMemo(() => calendarService.formatDays(children), [children]);
    return <span>{daysFormatted}</span>;
}

export default DayFormatter;
