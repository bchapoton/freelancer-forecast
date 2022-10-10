import React from 'react';
import Euro from './Euro';
import renderer from 'react-test-renderer';

it('Euro with cents renders correctly', () => {
    const tree = renderer.create(<Euro>{1000}</Euro>).toJSON();
    expect(tree).toMatchSnapshot();
});

it('Euro without cents  renders correctly', () => {
    const tree = renderer.create(<Euro cents={false}>{1000}</Euro>).toJSON();
    expect(tree).toMatchSnapshot();
});
