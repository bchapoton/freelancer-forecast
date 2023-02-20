import * as React from 'react';
import { useCallback, useMemo, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import calendarService, { DAY, WeekDaysArray } from '../../services/CalendarService';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../redux/hooks';
import { v4 as generateUID } from 'uuid';

type DaysSelectProps = {
    dispatchAction: ActionCreatorWithPayload<DAY[]>;
    defaultValue?: number[];
    label: string;
};

export default function DaysSelect({ dispatchAction, defaultValue = [], label }: DaysSelectProps) {
    const dispatch = useAppDispatch();
    const [internalValues, setInternalValues] = useState<number[]>(defaultValue);
    const inputId: string = useMemo<string>(() => generateUID(), []);
    const onSelectHandler = useCallback(
        (event: SelectChangeEvent<number[]>) => {
            const targetValue: string | number[] = event.target.value;
            if (Array.isArray(targetValue)) {
                setInternalValues(targetValue);
                dispatch(dispatchAction(calendarService.getDaysFromNumbers(targetValue as number[])));
            }
        },
        [dispatch, dispatchAction],
    );

    return (
        <div>
            <FormControl sx={{ width: '100%', mt: '10px', mb: '10px' }}>
                <InputLabel id={inputId + '-label'} size="small">
                    {label}
                </InputLabel>
                <Select
                    labelId={inputId + '-label'}
                    id={inputId}
                    fullWidth
                    multiple
                    value={internalValues}
                    onChange={onSelectHandler}
                    input={<OutlinedInput size="small" label={label} />}
                >
                    {WeekDaysArray.map((dayIndex: number) => (
                        <MenuItem key={'day-index-' + dayIndex} value={dayIndex}>
                            {calendarService.formatDay(dayIndex, 'dddd')}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
