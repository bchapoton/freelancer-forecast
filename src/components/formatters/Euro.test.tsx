import React from 'react';
import Euro from './Euro';
import renderer from 'react-test-renderer';

it('Euro with cents renders correctly', () => {
    const tree = renderer.create(<Euro cents={true}>{1000}</Euro>).toJSON();
    expect(tree).toMatchSnapshot();
});

it('Euro without cents  renders correctly', () => {
    const tree = renderer.create(<Euro>{1000}</Euro>).toJSON();
    expect(tree).toMatchSnapshot();
});

it('Euro with bold  renders correctly', () => {
    const tree = renderer.create(<Euro bold>{1000}</Euro>).toJSON();
    expect(tree).toMatchSnapshot();
});
