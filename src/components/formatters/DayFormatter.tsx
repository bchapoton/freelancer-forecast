import React from 'react';
import calendarService, { DAY } from '../../services/CalendarService';

export type DayFormatterProps = {
    children: DAY[];
};

function DayFormatter({ children }: DayFormatterProps) {
    return <span>{calendarService.formatDays(children)}</span>;
}

export default DayFormatter;
