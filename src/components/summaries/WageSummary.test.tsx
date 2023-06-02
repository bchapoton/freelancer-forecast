import React from 'react';
import renderer from 'react-test-renderer';
import { storeConfigurator } from '../../redux/store';
import { Provider } from 'react-redux';
import ThemeWrapper from '../ThemeWrapper';
import WageSummary from './WageSummary';
import { TestHelper } from '../../helpers/TestHelper';
import ParametersProvider from '../ParametersProvider';

it('Wage summary renders correctly', () => {
    const tree = renderer
        .create(
            <Provider store={storeConfigurator(TestHelper.initTestingStore())}>
                <ThemeWrapper>
                    <ParametersProvider>
                        <WageSummary />
                    </ParametersProvider>
                </ThemeWrapper>
            </Provider>,
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
