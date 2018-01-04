import React from 'react';
import { mount } from 'enzyme';
import render from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import expect from 'expect';


import ConnectedSignUpPage, { SignUpPage } from '../../src/components/SignUpPage';

const mockFuction = jest.fn();

describe('SignupPage', () => {
  const initialState = {
    register: [{
      isRegistered: false,
      data: {},
      error: '',
      isFetching: false,
      response: {}
    }]
  };
  const mockStore = configureMockStore();
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(<Provider store={store}><ConnectedSignUpPage /></Provider>);
  });


  it('should be defined', () => {
    expect(SignUpPage).toBeDefined();
  });

  it('should test and take snapshot of SignUpPage', () => {
    const tree = render.create(<SignUpPage signup={mockFuction} register={{ error: '' }} />);

    expect(tree).toMatchSnapshot();
  });
  it('it should render the ConnectedSignUpPage component', () => {
    expect(wrapper.find(ConnectedSignUpPage).length).toEqual(1);
  });

  it('it should check Prop matches with initialState', () => {
    expect(wrapper.find(SignUpPage).prop('register')).toEqual(initialState.register[0]);
  });
});
