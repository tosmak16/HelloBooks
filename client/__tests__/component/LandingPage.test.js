import React from 'react';
import render from 'react-test-renderer';
import expect from 'expect';
import { LandingPage } from '../../src/components/LandingPage';


it('should render and take snapshot of booksPage', () => {
  const tree = render.create(<LandingPage />);
  expect(tree).toMatchSnapshot();
});
