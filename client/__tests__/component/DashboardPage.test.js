import React from 'react';
import { mount, shallow } from 'enzyme';
import render from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import expect from 'expect';
import thunk from 'redux-thunk';
import jwt from 'jsonwebtoken';


import localStorageMock from '../../__mock__/localStorage';
import books from '../../__mock__/book';
import user from '../../__mock__/user';
import { e, event } from '../../__mock__/event';
import { UserProfileForm } from '../../src/components/Dashboard/UserProfileForm';
import { BorrowHistoryTable } from '../../src/components/Dashboard/BookHistoryTable';
import { BorrowedbooksTable } from '../../src/components/Dashboard/BorrowedbooksTable';
import { ChangePasswordForm } from '../../src/components/Dashboard/ChangePasswordForm';
import { DashboardSidebar } from '../../src/components/Dashboard/DashboardSidebar';
import BorrowHistoryBooksPageContainer, { BorrowHistoryBooksPage } from '../../src/components/Dashboard/Containers/BorrowHistoryBooksPage';
import ChangePasswordPageContainer, { ChangePasswordPage } from '../../src/components/Dashboard/Containers/ChangePasswordPage';
import UserProfilePageContainer, { UserProfile } from '../../src/components/Dashboard/Containers/UserProfile';
import BorrowedBooksPageContainer, { BorrowedBooksPage } from '../../src/components/Dashboard/Containers/BorrowedBooksPage';
import { BookHistoryTableRow } from '../../src/components/Dashboard/BookHistoryTableRow';

jest.mock('jsdom');
jest.mock('jwt-decode');
jest.mock('../../__mock__/localStorage');
const middlewares = [thunk]; // add your middlewares like `redux-thunk

window.document = localStorageMock;

const mockFuction = jest.fn();
const token = jwt.sign({ id: 1, user: 'Tosmak', role: 'admin' }, 'encoded');
window.localStorage = localStorageMock;
localStorage.setItem('jwtToken', token);


describe('Test Dashboard page components and container', () => {
  const initialState = {
    books: [{
      isFetching: false,
      isFetched: false,
      data: books,
      error: '',
    }],
    UserDetails: [{
      isFetching: false,
      data: [user[0]],
      error: '',
    }],
    refreshPage: [{
      isRefreshed: false,
    }],
    getborrowedBooks: [{
      isFetching: false,
      isFetched: false,
      data: books,
      error: '',
    }],
    returnBooks: [{
      data: '',
      error: '',
      isReturning: false,
      response: '',
    }],
    getunreturnedBooks: [{
      isFetching: false,
      isFetched: false,
      data: books,
      error: '',
    }],
    updateUser: [{
      isUpdating: false,
      data: '',
      error: '',
    }],
    userProfileImage: [{
      data: '',
      error: '',
      isUploading: false,
      response: '',
    }],
    passwordChange: [{
      isSending: false,
      data: '',
      error: '',
    }],
  };
  const mockStore = configureMockStore(middlewares);
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    window.localStorage = localStorageMock;
    //  wrapper = mount(<Provider store={store}><BorrowedBooksPage /></Provider>);
  });


  it('should test and take snapshot of BorrowedbooksTable', () => {
    const tree = render.create(<BorrowedbooksTable
      bookData={[]}
      unreturnedBooksData={[]}
      getunreturnedBooks={mockFuction}
      getbooks={mockFuction}
    />);
    expect(tree).toMatchSnapshot();
  });

  it('should test and take snapshot of BorrowHistoryTable', () => {
    const tree = render.create(<BorrowHistoryTable
      bookData={[]}
      unreturnedBooksData={[]}
      getborrowedBooks={mockFuction}
      getbooks={mockFuction}
    />);
    expect(tree).toMatchSnapshot();
  });

  it('should test and take snapshot of ChangePasswordForm', () => {
    const tree = render.create(<ChangePasswordForm
      passwordChange={[]}
      changePassword={mockFuction}
    />);
    expect(tree).toMatchSnapshot();
  });

  it('should test and take snapshot of DashboardSidebar', () => {
    const tree = render.create(<DashboardSidebar
      userData={[]}
    />);
    expect(tree).toMatchSnapshot();
  });
  it('should test and take snapshot of UserProfileForm', () => {
    const tree = render.create(<UserProfileForm
      userData={[]}
    />);
    expect(tree).toMatchSnapshot();
  });
  it('should test and take snapshot of BorrowedBooksPage', () => {
    const tree = render.create(<BorrowedBooksPage
      getUserdetails={mockFuction}
      getunreturnedBooks={mockFuction}
      getbooks={mockFuction}
    />);
    expect(tree).toMatchSnapshot();
  });
  it('should test and take snapshot of BorrowHistoryBooksPage', () => {
    const tree = render.create(<BorrowHistoryBooksPage
      getborrowedBooks={mockFuction}
      getUserdetails={mockFuction}
      getbooks={mockFuction}
    />);
    expect(tree).toMatchSnapshot();
  });
  it('should test and take snapshot of ChangePasswordPage', () => {
    const tree = render.create(<ChangePasswordPage
      getborrowedBooks={mockFuction}
      getUserdetails={mockFuction}
      getbooks={mockFuction}
    />);
    expect(tree).toMatchSnapshot();
  });
  it('should test and take snapshot of UserProfile', () => {
    const tree = render.create(<UserProfile
      getborrowedBooks={mockFuction}
      getUserdetails={mockFuction}
      getbooks={mockFuction}
    />);
    expect(tree).toMatchSnapshot();
  });
})
