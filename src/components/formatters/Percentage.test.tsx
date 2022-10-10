import React from 'react';
import renderer from 'react-test-renderer';
import Percentage from './Percentage';

it('Percentage renders correctly', () => {
    const tree = renderer.create(<Percentage>{80}</Percentage>).toJSON();
    expect(tree).toMatchSnapshot();
});
