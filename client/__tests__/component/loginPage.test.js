import React from 'react';
import render from 'react-test-renderer';
import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';


import ConnectedLoginPage, { Login } from '../../src/components/Login';
import { LoginForm } from '../../src/components/LoginForm';
import { e, event } from '../../__mock__/event';


const mockFuction = jest.fn();


describe('Login Page Component test', () => {
  const initialState = {
    log: [{
      isAuthenticated: false,
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

    wrapper = mount(<Provider store={ store }><ConnectedLoginPage /></Provider>);
  });

  it('should be defined', () => {
    expect(Login).toBeDefined();
  });

  it('should be defined', () => {
    expect(LoginForm).toBeDefined();
  });

  it('should test and take snapshot of LoginPage', () => {
    const tree = render.create(<LoginForm userSignin={ mockFuction } getbooks={ mockFuction } log={{ error: '' }} />);
    expect(tree).toMatchSnapshot();
  });

  it('should test and take snapshot of LoginPage', () => {
    const tree = render.create(<LoginForm userSignin={ mockFuction } getbooks={ mockFuction } log={{ error: 'error' }} />);
    expect(tree).toMatchSnapshot();
  });

  it('should test and take snapshot of LoginPage', () => {
    const tree = render.create(<Login userSignin={ mockFuction } getbooks={ mockFuction } log={{ error: 'error' }} />);
    expect(tree).toMatchSnapshot();
  });

  it('should test and take snapshot of loginpPage', () => {
    const tree = render.create(<connectLoginPage userSignin={ mockFuction } getbooks={ mockFuction } log={{ error: 'error' }} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render the connected component', () => {
    expect(wrapper.find(ConnectedLoginPage).length).toEqual(1);
  });

  it('+++ check Prop matches with initialState', () => {
    expect(wrapper.find(Login).prop('log')).toEqual(initialState.log[0]);
  });

  it('should test for handle change function', () => {
    wrapper = shallow(<LoginForm userSignin={ mockFuction } getbooks={ mockFuction } log={{ error: 'error' }} />);
    wrapper.instance().handeleFuction = mockFuction;
    wrapper.update();
    wrapper.instance().handleChange(e);
    wrapper.update();
  });

  it('should test for handle submit function and error state', () => {
    wrapper = shallow(<LoginForm userSignin={ mockFuction } getbooks={ mockFuction } log={{ error: 'error' }} />);
    wrapper.instance().handeleFuction = mockFuction;
    wrapper.update();
    wrapper.instance().handleSubmit(event);
    wrapper.update();
  });
});
