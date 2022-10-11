import React from 'react';
import renderer from 'react-test-renderer';
import { store } from '../../redux/store';
import { Provider } from 'react-redux';
import ThemeWrapper from '../ThemeWrapper';
import TaxesSummary from './TaxesSummary';

it('Taxes summary renders correctly', () => {
    const tree = renderer
        .create(
            <Provider store={store}>
                <ThemeWrapper>
                    <TaxesSummary />
                </ThemeWrapper>
            </Provider>,
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
