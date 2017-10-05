import React from 'react';
import { shallow, mount } from 'enzyme';
import render from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { Provider } from 'react-redux';
import expect from 'expect';


import ConnectedSignUpPage, { SignUpPage } from '../../src/components/SignUpPage';

const mockFuction = jest.fn();

describe('SignupPage', () => {
  const initialState = {
    reg: [{
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
    wrapper = mount(<Provider store={ store }><ConnectedSignUpPage /></Provider>);
  });


  it('should be defined', () => {
    expect(SignUpPage).toBeDefined();
  });

  it('should test and take snapshot of SignUpPage', () => {
    const tree = render.create(<SignUpPage userSignup={ mockFuction } reg={{ error: '' }} />);

    expect(tree).toMatchSnapshot();
  });
  it('+++ render the connected(SMART) component', () => {
    expect(wrapper.find(ConnectedSignUpPage).length).toEqual(1);
  });

  it('+++ check Prop matches with initialState', () => {
    expect(wrapper.find(SignUpPage).prop('reg')).toEqual(initialState.reg[0]);
  });
});
