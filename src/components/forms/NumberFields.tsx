import { useAppDispatch } from '../../redux/hooks';
import React, {
    ChangeEvent,
    FocusEvent,
    KeyboardEvent,
    ReactNode,
    useCallback,
    useMemo,
    useRef,
    useState,
} from 'react';
import { InputAdornment, InputProps as StandardInputProps, TextField } from '@mui/material';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { v4 as generateUID } from 'uuid';
import NumbersHelper from '../helpers/NumbersHelper';

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
    const inputRef = useRef<typeof TextField>();

    const onChangeHandler = useCallback(
        (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            if (isNaN(parseInt(event.currentTarget.value))) {
                setInternalValue('');
            } else {
                const inputValue: number = parseInt(event.currentTarget.value);
                setInternalValue(NumbersHelper.rangedNumber(inputValue, min, max));
            }
        },
        [min, max],
    );

    const onBlurHandler = useCallback(
        (event: FocusEvent<HTMLInputElement>) => {
            const parsedValue = parseInt(event.currentTarget.value);
            if (isNaN(parsedValue)) {
                setInternalValue(numberDefaultValue);
            } else {
                dispatch(dispatchAction(parsedValue));
            }
        },
        [dispatch, dispatchAction],
    );

    const onKeyDownHandler = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            event.currentTarget.blur();
        }
    }, []);

    const inputProps: Partial<StandardInputProps> | undefined = useMemo(() => {
        if (!unit) return undefined;
        return {
            endAdornment: <InputAdornment position="end">{unit}</InputAdornment>,
        };
    }, [unit]);

    return (
        <TextField
            id={generateUID()}
            label={label}
            variant="outlined"
            margin="normal"
            required
            type="number"
            fullWidth
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
            onKeyDown={onKeyDownHandler}
            inputRef={inputRef}
            value={internalValue}
            InputProps={inputProps}
            size="small"
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
