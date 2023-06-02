import ParametersSummary from './ParametersSummary';
import React from 'react';
import renderer from 'react-test-renderer';
import { storeConfigurator } from '../../redux/store';
import { Provider } from 'react-redux';
import ThemeWrapper from '../ThemeWrapper';
import { TestHelper } from '../../helpers/TestHelper';
import ParametersProvider from '../ParametersProvider';

it('Parameters summary renders correctly', () => {
    const tree = renderer
        .create(
            <Provider store={storeConfigurator(TestHelper.initTestingStore())}>
                <ThemeWrapper>
                    <ParametersProvider>
                        <ParametersSummary />
                    </ParametersProvider>
                </ThemeWrapper>
            </Provider>,
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
