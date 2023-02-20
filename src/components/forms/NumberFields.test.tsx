import renderer, { ReactTestRenderer } from 'react-test-renderer';
import React from 'react';
import { setVatRate } from '../../redux/slices/ParametersSlice';
import { store } from '../../redux/store';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { TextField } from '@mui/material';
import { NumberField } from './NumberFields';

function createRenderer(defaultValue: number): ReactTestRenderer {
    return renderer.create(
        <Provider store={store}>
            <NumberField
                label="VAT rate"
                min={min}
                max={max}
                unit="my unit"
                dispatchAction={setVatRate}
                uuid={() => '1'}
                defaultValue={defaultValue}
            />
        </Provider>,
    );
}

const min: number = 0;
const max: number = 100;

it('NumberField act correctly', () => {
    const defaultValueFromStore = store.getState().parameters.vatRate;
    const min: number = 0;
    const max: number = 100;
    const component = createRenderer(defaultValueFromStore);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // trigger some changes
    const newValues: number = 60;
    const instance = component.root;
    const found = instance.findByType(TextField);
    renderer.act(() => {
        if (found.props.onChange) {
            found.props.onChange({ target: { value: newValues } });
        }
    });
    expect(component.toJSON()).toMatchSnapshot();
    // internal value must have changed
    expect(found.props.value).toEqual(newValues);
    // the store will be updated on blur event
    expect(store.getState().parameters.vatRate).toEqual(defaultValueFromStore);

    // over max
    const overMaxValue: number = 200;
    renderer.act(() => {
        if (found.props.onChange) {
            found.props.onChange({ target: { value: overMaxValue } });
        }
    });
    expect(component.toJSON()).toMatchSnapshot();
    // internal value must be the max value
    expect(found.props.value).toEqual(max);

    // under min
    const underMinValue: number = -5;
    renderer.act(() => {
        if (found.props.onChange) {
            found.props.onChange({ target: { value: underMinValue } });
        }
    });
    expect(component.toJSON()).toMatchSnapshot();
    // internal value must be the max value
    expect(found.props.value).toEqual(min);

    // blur NumberField
    const blurValue: number = 50;
    renderer.act(() => {
        if (found.props.onBlur) {
            found.props.onBlur({ target: { value: blurValue } });
        }
    });
    expect(component.toJSON()).toMatchSnapshot();
    // check if the store changed
    expect(store.getState().parameters.vatRate).toEqual(blurValue);
});
