import React from 'react';
import { shallow } from 'enzyme';
import render from 'react-test-renderer';
import expect from 'expect';
import $ from 'jquery';

import { SignUpForm } from '../../src/components/SignUpForm';
import { e, event } from '../../__mock__/event';
const mockFuction = jest.fn();
describe('Signup Form Component test', () => {
  let wrapper;
  it('should render signupform without crashing', () => {
    expect(SignUpForm).toBeDefined();
  });

  it('should test and take snapshot of SignForm', () => {
    const tree = render.create(<SignUpForm userSignup={mockFuction} register={{ error: '' }} />);
    expect(tree).toMatchSnapshot();
  });

  it('should change input state when handleChange is called', () => {
    wrapper = shallow(<SignUpForm userSignup={mockFuction} register={{ error: '' }} />);
    wrapper.instance().handeleFuction = mockFuction;
    wrapper.update();
    wrapper.instance().handleChange(e);
    wrapper.update();
    expect(wrapper.instance().state[e.target.name]).toBe(e.target.value);
  });

  it('should update error state and trigger userSignup function when handle submit function is called', () => {
    wrapper = shallow(<SignUpForm userSignup={mockFuction} register={{ error: 'hello' }} />);
    wrapper.instance().handeleFuction = mockFuction;
    wrapper.update();
    wrapper.instance().handleSubmit(event);
    expect(wrapper.instance().state.errors).toBe('');
    expect(wrapper.instance().props.userSignup).toHaveBeenCalled();
  });
});
