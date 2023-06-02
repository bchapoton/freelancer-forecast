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
import { generateUID } from '../../helpers/UUIDHelper';
import NumbersHelper from '../helpers/NumbersHelper';

type BaseNumberFieldProps = {
    dispatchAction: ActionCreatorWithPayload<number>;
    defaultValue?: number;
    label: string;
};

export type NumberFieldProps = BaseNumberFieldProps & {
    min?: number;
    max?: number;
    unit?: ReactNode;
    uuid?: { (): string };
};

export function NumberField({
    dispatchAction,
    defaultValue,
    label,
    min,
    max,
    unit,
    uuid = generateUID,
}: NumberFieldProps) {
    const dispatch = useAppDispatch();
    const numberDefaultValue: number | '' = defaultValue === undefined ? '' : defaultValue;
    const [internalValue, setInternalValue] = useState<number | ''>(numberDefaultValue);
    const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>();

    const onChangeHandler = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            if (isNaN(parseInt(event.target.value))) {
                setInternalValue('');
            } else {
                const inputValue: number = parseInt(event.target.value);
                setInternalValue(NumbersHelper.rangedNumber(inputValue, min, max));
            }
        },
        [min, max],
    );

    const onBlurHandler = useCallback(
        (event: FocusEvent<HTMLInputElement>) => {
            const parsedValue = parseInt(event.target.value);
            if (isNaN(parsedValue)) {
                setInternalValue(numberDefaultValue);
            } else {
                dispatch(dispatchAction(parsedValue));
            }
        },
        [dispatch, dispatchAction, numberDefaultValue],
    );

    const onKeyDownHandler = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            inputRef.current?.blur();
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
            id={uuid()}
            label={label}
            variant="outlined"
            margin="normal"
            required
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
