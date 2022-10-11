import ParametersSummary from './ParametersSummary';
import React from 'react';
import renderer from 'react-test-renderer';
import { store } from '../../redux/store';
import { Provider } from 'react-redux';
import ThemeWrapper from '../ThemeWrapper';

it('Parameters summary renders correctly', () => {
    const tree = renderer
        .create(
            <Provider store={store}>
                <ThemeWrapper>
                    <ParametersSummary />
                </ThemeWrapper>
            </Provider>,
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
