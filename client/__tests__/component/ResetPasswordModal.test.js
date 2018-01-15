import expect from 'expect';
import { mount, shallow } from 'enzyme';
import render from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import React from 'react';
import $ from 'jquery';
import localStorageMock from '../../__mock__/localStorage';
import books from '../../__mock__/book';
import { e, event } from '../../__mock__/event';
import { ResetPasswordModal } from '../../src/components/modal/ResetPasswordModal';

const middlewares = [thunk]; // add your middlewares like `redux-thunk
const mockFuction = jest.fn();
const mockStore = configureMockStore(middlewares);
let store;
let wrapper;
describe('Test book Details page components and container', () => {
  it('should render and take snapshot of ResetPasswordModal', () => {
    const tree = render.create(<ResetPasswordModal
      userEmailText=''
      handleSendMail={mockFuction}
      handleClose={mockFuction}
      handleInputEmailChange={mockFuction}
    />);
    expect(tree).toMatchSnapshot();
  });
});
