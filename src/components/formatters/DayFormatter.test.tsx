import React from 'react';
import DayFormatter from './DayFormatter';
import { DAY } from '../../services/CalendarService';
import renderer from 'react-test-renderer';

it('DayFormatter renders correctly', () => {
    const tree = renderer.create(<DayFormatter>{[DAY.SATURDAY, DAY.SUNDAY]}</DayFormatter>).toJSON();
    expect(tree).toMatchSnapshot();
});
