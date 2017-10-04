import React from 'react';
import { shallow } from 'enzyme';
import render from 'react-test-renderer';


import { SignUpPage } from '../../src/components/SignUpPage';

const mockFuction = jest.fn();

describe('SignupPage', () => {
  it('should be defined', () => {
    expect(SignUpPage).toBeDefined();
  });

  it('should test and take snapshot of SignUpPage', () => {
    const tree = render.create(<SignUpPage userSignup={ mockFuction } reg={{ error: '' }} />);

    expect(tree).toMatchSnapshot();
  });
});
