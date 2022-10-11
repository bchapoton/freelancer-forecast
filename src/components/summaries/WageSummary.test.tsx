import React from 'react';
import renderer from 'react-test-renderer';
import { store } from '../../redux/store';
import { Provider } from 'react-redux';
import ThemeWrapper from '../ThemeWrapper';
import WageSummary from './WageSummary';

it('Wage summary renders correctly', () => {
    const tree = renderer
        .create(
            <Provider store={store}>
                <ThemeWrapper>
                    <WageSummary />
                </ThemeWrapper>
            </Provider>,
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
