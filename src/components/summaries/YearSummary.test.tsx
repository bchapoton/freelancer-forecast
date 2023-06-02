import React from 'react';
import renderer from 'react-test-renderer';
import { storeConfigurator } from '../../redux/store';
import { Provider } from 'react-redux';
import ThemeWrapper from '../ThemeWrapper';
import YearSummary from './YearSummary';
import { TestHelper } from '../../helpers/TestHelper';

it('Year summary renders correctly', () => {
    const tree = renderer
        .create(
            <Provider store={storeConfigurator(TestHelper.initTestingStore())}>
                <ThemeWrapper>
                    <YearSummary />
                </ThemeWrapper>
            </Provider>,
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
