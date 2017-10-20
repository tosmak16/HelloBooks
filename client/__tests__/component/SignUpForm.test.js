import React from 'react';
import { shallow } from 'enzyme';
import render from 'react-test-renderer';
import expect from 'expect';


import { SignUpForm } from '../../src/components/SignUpForm';
import { e, event } from '../../__mock__/event';

const mockFuction = jest.fn();


describe('Signup Form Component test', () => {
  let wrapper;


  it('should be defined', () => {
    expect(SignUpForm).toBeDefined();
  });

  it('should test and take snapshot of SignUpPage', () => {
    const tree = render.create(<SignUpForm userSignup={mockFuction} reg={{ error: '' }} />);
    expect(tree).toMatchSnapshot();
  });

  it('should test for handle change function', () => {
    wrapper = shallow(<SignUpForm userSignup={mockFuction} reg={{ error: '' }} />);
    wrapper.instance().handeleFuction = mockFuction;
    wrapper.update();
    wrapper.instance().handleChange(e);
    wrapper.update();
  });

  it('should test for handle submit function and error state', () => {
    wrapper = shallow(<SignUpForm userSignup={mockFuction} reg={{ error: 'hello' }} />);
    wrapper.instance().handeleFuction = mockFuction;
    wrapper.update();
    wrapper.instance().handleSubmit(event);
    wrapper.update();
  });
});
