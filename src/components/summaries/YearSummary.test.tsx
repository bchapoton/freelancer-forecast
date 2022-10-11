import React from 'react';
import renderer from 'react-test-renderer';
import { store } from '../../redux/store';
import { Provider } from 'react-redux';
import ThemeWrapper from '../ThemeWrapper';
import YearSummary from './YearSummary';

it('Year summary renders correctly', () => {
    const tree = renderer
        .create(
            <Provider store={store}>
                <ThemeWrapper>
                    <YearSummary />
                </ThemeWrapper>
            </Provider>,
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
