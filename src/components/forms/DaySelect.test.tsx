import renderer from 'react-test-renderer';
import React from 'react';
import DaysSelect from './DaysSelect';
import { setNonWorkingDays } from '../../redux/slices/ParametersSlice';
import { store } from '../../redux/store';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { Select } from '@mui/material';
import { DAY } from '../../services/CalendarService';

it('DaySelect renders correctly', () => {
    const defaultValueFromStore = store.getState().parameters.nonWorkingDays;
    const component = renderer.create(
        <Provider store={store}>
            <DaysSelect
                label="My day selector"
                dispatchAction={setNonWorkingDays}
                uuid={() => '1'}
                defaultValue={defaultValueFromStore}
            />
        </Provider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // trigger some changes
    const newValues: DAY[] = [DAY.MONDAY];
    const instance = component.root;
    const found = instance.findByType(Select);
    renderer.act(() => {
        if (found.props.onChange) {
            found.props.onChange({ target: { value: newValues } });
        }
    });
    expect(component.toJSON()).toMatchSnapshot();
    // check if store was updated from change
    expect(store.getState().parameters.nonWorkingDays).toEqual(newValues);
});
