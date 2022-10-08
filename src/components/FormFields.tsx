import { useAppDispatch } from '../redux/hooks';
import React, { ChangeEventHandler, FocusEventHandler, ReactNode, useState } from 'react';
import { InputAdornment, InputProps as StandardInputProps, TextField } from '@mui/material';
import { generateUniqueID } from 'web-vitals/dist/modules/lib/generateUniqueID';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

type BaseNumberFieldProps = {
    dispatchAction: ActionCreatorWithPayload<number, string>;
    defaultValue?: number;
    label: string;
};

export type NumberFieldProps = BaseNumberFieldProps & {
    min?: number;
    max?: number;
    unit?: ReactNode;
};

export function NumberField({ dispatchAction, defaultValue, label, min, max, unit }: NumberFieldProps) {
    const dispatch = useAppDispatch();
    const numberDefaultValue: number | '' = defaultValue === undefined ? '' : defaultValue;
    const [internalValue, setInternalValue] = useState<number | ''>(numberDefaultValue);

    const onChangeHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
        if (isNaN(parseInt(event.currentTarget.value))) {
            setInternalValue('');
        } else {
            let inputValue: number = parseInt(event.currentTarget.value);
            if (min !== undefined && inputValue < min) {
                inputValue = min;
            } else if (max !== undefined && inputValue > max) {
                inputValue = max;
            }
            setInternalValue(inputValue);
        }
    };

    const onBlurHandler: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
        if (isNaN(parseInt(event.currentTarget.value))) {
            setInternalValue(numberDefaultValue);
        } else {
            dispatch(dispatchAction(parseInt(event.currentTarget.value)));
        }
    };

    let inputProps: Partial<StandardInputProps> | undefined = undefined;

    if (unit) {
        inputProps = {
            endAdornment: <InputAdornment position="end">{unit}</InputAdornment>,
        };
    }

    return (
        <TextField
            id={generateUniqueID()}
            label={label}
            variant="outlined"
            margin="normal"
            required
            type="number"
            fullWidth
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
            onKeyPress={(event) => {
                if (event.key === 'Enter') {
                    event.currentTarget.blur();
                }
            }}
            value={internalValue}
            InputProps={inputProps}
        />
    );
}

export type PercentageFieldProps = BaseNumberFieldProps;

export function PercentageField({ dispatchAction, defaultValue, label }: PercentageFieldProps) {
    return (
        <NumberField
            label={label}
            dispatchAction={dispatchAction}
            defaultValue={defaultValue}
            min={0}
            max={100}
            unit="%"
        />
    );
}

type EuroFieldProps = BaseNumberFieldProps;

export function EuroField({ dispatchAction, defaultValue, label }: EuroFieldProps) {
    return <NumberField label={label} dispatchAction={dispatchAction} defaultValue={defaultValue} min={0} unit="€" />;
}

type WeeksNumberFieldProps = BaseNumberFieldProps;

export function WeeksNumberField({ dispatchAction, defaultValue, label }: WeeksNumberFieldProps) {
    return (
        <NumberField
            label={label}
            dispatchAction={dispatchAction}
            defaultValue={defaultValue}
            min={0}
            max={52}
            unit="semaines"
        />
    );
}

type IncomingSplittingPartsFieldProps = BaseNumberFieldProps;

export function IncomingSplittingPartsField({ dispatchAction, defaultValue, label }: IncomingSplittingPartsFieldProps) {
    return (
        <NumberField label={label} dispatchAction={dispatchAction} defaultValue={defaultValue} min={1} unit="part(s)" />
    );
}
