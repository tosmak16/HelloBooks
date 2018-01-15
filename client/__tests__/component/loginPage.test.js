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
    login: [{
      isAuthenticated: false,
      data: {},
      error: '',
      isFetching: false,
      response: {}
    }],
    resetPassword: [{
      isSending: false,
      data: '',
      error: '',
    }]
  };
  const mockStore = configureMockStore();
  let store;
  let wrapper;
  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(<Provider store={store}><ConnectedLoginPage /></Provider>);
  });
  it('should check if LoginPage is defined', () => {
    expect(Login).toBeDefined();
  });
  it('should check if LoginForm is defined', () => {
    expect(LoginForm).toBeDefined();
  });
  it('should render and take snapshot of LoginForm', () => {
    const tree = render.create(<LoginForm resetPasswordStatus='' resetUserPassword={mockFuction} googleAuthSignIn={mockFuction} userSignin={mockFuction} getbooks={mockFuction} login={{ error: '' }} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render and take snapshot of LoginPage', () => {
    const tree = render.create(<Login resetPasswordStatus='' resetUserPassword={mockFuction} googleAuthSignIn={mockFuction} userSignin={mockFuction} getBooks={mockFuction} login={{ error: 'error' }} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render and take snapshot of connected loginpPage', () => {
    const tree = render.create(<connectLoginPage resetPasswordStatus='' resetUserPassword={mockFuction} googleAuthSignIn={mockFuction} userSignin={mockFuction} getBooks={mockFuction} log={{ error: 'error' }} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render Loginpage connected component', () => {
    expect(wrapper.find(ConnectedLoginPage).length).toEqual(1);
  });
  it('it should check Prop matches with initialState', () => {
    expect(wrapper.find(Login).prop('login')).toEqual(initialState.login[0]);
  });
  it('should update input onchange state to 1000 when handle change function is called', () => {
    wrapper = shallow(<LoginForm resetPasswordStatus='' resetUserPassword={mockFuction} googleAuthSignIn={mockFuction} userSignin={mockFuction} getbooks={mockFuction} login={{ error: 'error' }} />);
    wrapper.instance().handleFuction = mockFuction;
    wrapper.update();
    wrapper.instance().handleChange(e);
    wrapper.update();
    expect(wrapper.instance().state.Tosmak).toBe("1000");
  });
  it('should not update userEmailText state to empty when resetPassowrdStatus is empty', () => {
    const nextProps = {
      resetPasswordStatus: ''
    }
    wrapper = shallow(<LoginForm resetPasswordStatus='' resetUserPassword={mockFuction} googleAuthSignIn={mockFuction} userSignin={mockFuction} getbooks={mockFuction} login={{ error: 'error' }} />);
    wrapper.instance().handleFuction = mockFuction;
    wrapper.update();
    wrapper.instance().componentWillReceiveProps(nextProps)
    expect(wrapper.instance().props.resetPasswordStatus).toBe(nextProps.resetPasswordStatus);
    expect(wrapper.instance().state.userEmailText).toBe("");
  });
  it('should update userEmailText state to empty when resetPassowrdStatus has a new props', () => {
    const nextProps = {
      resetPasswordStatus: 'true'
    }
    wrapper = shallow(<LoginForm resetPasswordStatus='' resetUserPassword={mockFuction} googleAuthSignIn={mockFuction} userSignin={mockFuction} getbooks={mockFuction} login={{ error: 'error' }} />);
    wrapper.instance().handleFuction = mockFuction;
    wrapper.update();
    wrapper.instance().componentWillReceiveProps(nextProps)
    expect(wrapper.instance().state.userEmailText).toBe("");
  });
  it('should call userSignin and getbooks when handle submit function is called', () => {
    wrapper = shallow(<LoginForm resetPasswordStatus='' resetUserPassword={mockFuction} googleAuthSignIn={mockFuction} userSignin={mockFuction} getbooks={mockFuction} login={{ error: 'error' }} />);
    wrapper.instance().handleSubmit(event);
    wrapper.update();
    expect(wrapper.instance().props.userSignin).toHaveBeenCalled();
    expect(wrapper.instance().props.getbooks).toHaveBeenCalled();
  });
  it('should update displayModal to false when handleClose function is called', () => {
    wrapper = shallow(<LoginForm resetPasswordStatus='' resetUserPassword={mockFuction} googleAuthSignIn={mockFuction} userSignin={mockFuction} getbooks={mockFuction} login={{ error: 'error' }} />);
    wrapper.instance().handleClose()
    expect(wrapper.instance().state.displayModal).toBe(false);
  });
  it('should update displayModal to false when handleClose function is called', () => {
    wrapper = shallow(<LoginForm resetPasswordStatus='' resetUserPassword={mockFuction} googleAuthSignIn={mockFuction} userSignin={mockFuction} getbooks={mockFuction} login={{ error: 'error' }} />);
    wrapper.instance().handleGoogleSignin();
    expect(wrapper.instance().state.isLoggedIn).toBe(true);
  });
  it('should call resetUserPassword when handleSendMail function is called', () => {
    wrapper = shallow(<LoginForm resetPasswordStatus='' resetUserPassword={mockFuction} googleAuthSignIn={mockFuction} userSignin={mockFuction} getbooks={mockFuction} login={{ error: 'error' }} />);
    wrapper.instance().handleSendMail()
    expect(wrapper.instance().props.resetUserPassword).toHaveBeenCalled();
  });
  it('should update userEmailText to event.target.value when handleClose function is called', () => {
    wrapper = shallow(<LoginForm resetPasswordStatus='' resetUserPassword={mockFuction} googleAuthSignIn={mockFuction} userSignin={mockFuction} getbooks={mockFuction} login={{ error: 'error' }} />);
    wrapper.instance().handleInputEmailChange(e)
    expect(wrapper.instance().state.userEmailText).toBe(e.target.value);
  });
  it('should update displayModal to true when renderResetPasswordModal function is called', () => {
    wrapper = shallow(<LoginForm resetPasswordStatus='' resetUserPassword={mockFuction} googleAuthSignIn={mockFuction} userSignin={mockFuction} getbooks={mockFuction} login={{ error: 'error' }} />);
    wrapper.instance().renderResetPasswordModal()
    expect(wrapper.instance().state.displayModal).toBe(true);
  });
  it('should call googleAuthSignIn when onSignIn function is called', () => {
    wrapper = shallow(<LoginForm resetPasswordStatus='' resetUserPassword={mockFuction} googleAuthSignIn={mockFuction} userSignin={mockFuction} getbooks={mockFuction} login={{ error: 'error' }} />);
    wrapper.instance().setState({
      isLoggedIn: true
    })
    wrapper.instance().onSignIn()
    wrapper.instance().setState({
      isLoggedIn: false
    })
    wrapper.instance().onSignIn()
    expect(wrapper.instance().props.googleAuthSignIn).toHaveBeenCalled();
  });
});
