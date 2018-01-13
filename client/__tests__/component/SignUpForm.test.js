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

  it('should test for handle change function for changing input state', () => {
    wrapper = shallow(<SignUpForm userSignup={mockFuction} register={{ error: '' }} />);
    wrapper.instance().handeleFuction = mockFuction;
    wrapper.update();
    wrapper.instance().handleChange(e);
    wrapper.update();
    expect(wrapper.instance().state.Tosmak).toBe("1000");
  });

  it('should test for handle submit function and error state', () => {
    wrapper = shallow(<SignUpForm userSignup={mockFuction} register={{ error: 'hello' }} />);
    wrapper.instance().handeleFuction = mockFuction;
    wrapper.update();
    wrapper.instance().handleSubmit(event);
    wrapper.update();
  });
});
