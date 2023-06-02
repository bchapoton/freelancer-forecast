import React from 'react';
import renderer from 'react-test-renderer';
import { storeConfigurator } from '../../redux/store';
import { Provider } from 'react-redux';
import ThemeWrapper from '../ThemeWrapper';
import TaxesSummary from './TaxesSummary';
import { TestHelper } from '../../helpers/TestHelper';
import ParametersProvider from '../ParametersProvider';

it('Taxes summary renders correctly', () => {
    const tree = renderer
        .create(
            <Provider store={storeConfigurator(TestHelper.initTestingStore())}>
                <ThemeWrapper>
                    <ParametersProvider>
                        <TaxesSummary />
                    </ParametersProvider>
                </ThemeWrapper>
            </Provider>,
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
