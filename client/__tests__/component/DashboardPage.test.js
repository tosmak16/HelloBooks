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
import ConnectedDashboardPage from '../../src/components/Dashboard/Containers/BorrowedBooksPage';
import UserProfile from '../../src/components/Dashboard/UserProfile';
import BorrowHistoryTable from '../../src/components/Dashboard/BookHistoryTable';
import BorrowedbooksTable from '../../src/components/Dashboard/BorrowedbooksTable';
import ChangePasswordPage from '../../src/components/Dashboard/ChangePasswordPage';
import DashboardSidebar from '../../src/components/Dashboard/DashboardSidebar';


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


    wrapper = mount(<Provider store={store}><ConnectedDashboardPage /></Provider>);
  });
  it('should test and take snapshot of dashboard Page', () => {
    const tree = render.create(<DashboardPage
      userData={initialState.UserDetails[0].data}
      userDataError={initialState.UserDetails[0].error}
      isRefreshed={initialState.refreshPage[0].isRefreshed}
      bhData={initialState.getborrowedBooks[0].data}
      bookData={initialState.books[0].data}
      item={initialState.returnBooks}
      bbData={initialState.getunreturnedBooks[0].data}
      userItem={initialState.updateUser}
      imageUrl={initialState.userProfileImage[0].response}
      error={initialState.updateUser[0].error.toString()}
      message={initialState.updateUser[0].data.toString()}
      passwordChange={initialState.passwordChange}
      getunreturnedBooks={mockFuction}
      returnbook={mockFuction}
      getborrowedBooks={mockFuction}
      getbooks={mockFuction}
      getUserdetails={mockFuction}
      refreshPage={mockFuction}
      updateUser={mockFuction}
      uploadAvatar={mockFuction}
      changePassword={mockFuction}
    />);
    expect(tree).toMatchSnapshot();
  });

  it('should test and take snapshot of user profile page when data and book array are empty', () => {
    const tree = render.create(<UserProfile
      data={initialState.UserDetails[0].data}
      item={initialState.returnBooks}
      updateUser={mockFuction}

    />);
    expect(tree).toMatchSnapshot();
  });

  it('should test for component will receiveprops methods call in user profile page ', () => {
    const nextProps = {
      data: user,
      item: [{ error: 'error', data: '' }],

    };


    wrapper = shallow(<UserProfile
      data={initialState.UserDetails[0].data}
      item={initialState.returnBooks}
      updateUser={mockFuction}
    />);
    wrapper.instance().setState({
      display: true,
    });
    wrapper.update();
    wrapper.instance().componentWillReceiveProps(nextProps);
    wrapper.update();
  });

  it('should test if handleEdit function was called in user profile page', () => {
    const app = shallow(<UserProfile
      data={initialState.UserDetails[0].data}
      item={initialState.returnBooks}
      updateUser={mockFuction}
    />);
    app.instance().setState({
      email: 'fcgb',
      firstName: 'hfcv',
      lastName: 'gvnbn',
      mobileNumber: 'ddfghj',
      profileImage: 'dfgh',
      membershipType: 'Basic',
    });
    app.update();

    const instance = app.instance();
    const spy = jest.spyOn(instance, 'handleEdit');
    instance.forceUpdate();
    instance.handleEdit(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should test if handleEdit function was called in user profile page', () => {
    const app = shallow(<UserProfile
      data={initialState.UserDetails[0].data}
      item={initialState.returnBooks}
      updateUser={mockFuction}
    />);
    app.instance().setState({
      email: 'fcgb',
      firstName: 'hfcv',
      lastName: 'gvnbn',
      mobileNumber: 'ddfghj',
      profileImage: 'dfgh',
      membershipType: 'Basic',
    });
    app.update();

    const instance = app.instance();
    const spy = jest.spyOn(instance, 'handleEdit');
    instance.forceUpdate();
    instance.handleEdit(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should test for handle methods call for componenetwillRecieveProps in user profile page when number is empty ', () => {
    const user2 = [{
      firstName: 'Tobi',
      lastName: 'Akinola',
      email: 'tobi@gmail.com',
      mobileNumber: '',
      membershipType: 'Basic',
      image: 'user.jpg',
    }];

    const nextProps = {
      data: user2,
      item: [{ error: '', data: 'good' }],

    };


    wrapper = shallow(<UserProfile
      data={initialState.UserDetails[0].data}
      item={initialState.returnBooks}
      updateUser={mockFuction}
    />);
    wrapper.instance().setState({
      display: true,
    });
    wrapper.update();
    wrapper.instance().componentWillReceiveProps(nextProps);
    wrapper.update();
  });


  it('should test if handleExit function was called in user profile page', () => {
    const app = shallow(<UserProfile
      data={initialState.UserDetails[0].data}
      item={initialState.returnBooks}
      updateUser={mockFuction}
    />);
    const instance = app.instance();
    const spy = jest.spyOn(instance, 'handleExit');
    instance.forceUpdate();
    instance.handleExit(event);
    expect(spy).toHaveBeenCalled();
  });


  it('should test if handleInputChange function was called in user profile page', () => {
    const app = shallow(<UserProfile
      data={initialState.UserDetails[0].data}
      item={initialState.returnBooks}
      updateUser={mockFuction}
    />);
    const instance = app.instance();
    const spy = jest.spyOn(instance, 'handleInputChange');
    instance.forceUpdate();
    instance.handleInputChange(e);
    expect(spy).toHaveBeenCalled();
  });

  it('should test if handleClose function was called in user profile page', () => {
    const app = shallow(<UserProfile
      data={initialState.UserDetails[0].data}
      item={initialState.returnBooks}
      updateUser={mockFuction}
    />);
    const instance = app.instance();
    const spy = jest.spyOn(instance, 'handleClose');
    instance.forceUpdate();
    instance.handleClose(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should test if handleClick function was called in user profile page', () => {
    const app = shallow(<UserProfile
      data={initialState.UserDetails[0].data}
      item={initialState.returnBooks}
      updateUser={mockFuction}
    />);
    const instance = app.instance();
    const spy = jest.spyOn(instance, 'handleClick');
    instance.forceUpdate();
    instance.handleClick(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should test for component will receiveprops methods call in BooksHistory page ', () => {
    const nextProps = {
      data: books,
      isRefreshed: true,

    };


    wrapper = shallow(<BorrowHistoryTable
      isRefreshed={initialState.refreshPage[0].isRefreshed}
      data={initialState.getborrowedBooks[0].data}
      bookData={initialState.books[0].data}
      getborrowedBooks={mockFuction}
      getbooks={mockFuction}
      refreshPage={mockFuction}
    />);
    const instance = wrapper.instance();
    const spy = jest.spyOn(instance, 'componentWillReceiveProps');
    instance.forceUpdate();
    wrapper.update();
    wrapper.instance().componentWillReceiveProps(nextProps);
    wrapper.update();
    expect(spy).toHaveBeenCalled();
  });

  it('should test for componentWillMount method call in BooksHistory page ', () => {
    const nextProps = {
      data: books,
      isRefreshed: true,

    };


    wrapper = shallow(<BorrowHistoryTable
      isRefreshed
      data={[]}
      bookData={[]}
      getborrowedBooks={mockFuction}
      getbooks={mockFuction}
      refreshPage={mockFuction}
    />);
    const instance = wrapper.instance();
    const spy = jest.spyOn(instance, 'componentWillMount');
    instance.forceUpdate();
    wrapper.update();
    wrapper.instance().componentWillMount();
    wrapper.update();
    expect(spy).toHaveBeenCalled();
  });


  it('should test for component will receiveprops methods call in Borrowedbooks page when error is not void ', () => {
    const nextProps = {
      data: books,
      isRefreshed: true,
      item: [{ error: 'error', data: 'good' }],

    };


    wrapper = shallow(<BorrowedbooksTable
      isRefreshed={initialState.refreshPage[0].isRefreshed}
      bookData={initialState.books[0].data}
      item={initialState.returnBooks}
      data={initialState.getunreturnedBooks[0].data}
      getunreturnedBooks={mockFuction}
      returnbook={mockFuction}
      getborrowedBooks={mockFuction}
      getbooks={mockFuction}
      refreshPage={mockFuction}
    />);
    const instance = wrapper.instance();
    instance.setState({
      pointer: true,
    });
    const spy = jest.spyOn(instance, 'componentWillReceiveProps');
    instance.forceUpdate();
    wrapper.update();
    wrapper.instance().componentWillReceiveProps(nextProps);
    wrapper.update();
    expect(spy).toHaveBeenCalled();
  });

  it('should test for component will receiveprops methods call in Borrowedbooks page when error message is void ', () => {
    const nextProps = {
      data: books,
      isRefreshed: false,
      item: [{ error: '', response: 'good' }],

    };


    wrapper = shallow(<BorrowedbooksTable
      isRefreshed={initialState.refreshPage[0].isRefreshed}
      bookData={initialState.books[0].data}
      item={initialState.returnBooks}
      data={initialState.getunreturnedBooks[0].data}
      getunreturnedBooks={mockFuction}
      returnbook={mockFuction}
      getborrowedBooks={mockFuction}
      getbooks={mockFuction}
      refreshPage={mockFuction}
    />);
    const instance = wrapper.instance();
    instance.setState({
      pointer: true,
    });
    const spy = jest.spyOn(instance, 'componentWillReceiveProps');
    instance.forceUpdate();
    wrapper.update();
    wrapper.instance().componentWillReceiveProps(nextProps);
    wrapper.update();
    expect(spy).toHaveBeenCalled();
  });

  it('should test for component will receiveprops methods call in Borrowedbooks page when pointer is false ', () => {
    const nextProps = {
      data: books,
      isRefreshed: false,
      item: [{ error: '', response: 'good' }],

    };


    wrapper = shallow(<BorrowedbooksTable
      isRefreshed={initialState.refreshPage[0].isRefreshed}
      bookData={initialState.books[0].data}
      item={initialState.returnBooks}
      data={initialState.getunreturnedBooks[0].data}
      getunreturnedBooks={mockFuction}
      returnbook={mockFuction}
      getborrowedBooks={mockFuction}
      getbooks={mockFuction}
      refreshPage={mockFuction}
    />);
    const instance = wrapper.instance();
    instance.setState({
      pointer: false,
    });
    const spy = jest.spyOn(instance, 'componentWillReceiveProps');
    instance.forceUpdate();
    wrapper.update();
    wrapper.instance().componentWillReceiveProps(nextProps);
    wrapper.update();
    expect(spy).toHaveBeenCalled();
  });

  it('should test for componentWillMount method call in BorrowedbooksTable page ', () => {
    wrapper = shallow(<BorrowedbooksTable
      isRefreshed={initialState.refreshPage[0].isRefreshed}
      bookData={initialState.books[0].data}
      item={initialState.returnBooks}
      data={initialState.getunreturnedBooks[0].data}
      getunreturnedBooks={mockFuction}
      returnbook={mockFuction}
      getborrowedBooks={mockFuction}
      getbooks={mockFuction}
      refreshPage={mockFuction}
    />);
    const instance = wrapper.instance();
    const spy = jest.spyOn(instance, 'componentWillMount');
    instance.forceUpdate();
    wrapper.update();
    wrapper.instance().componentWillMount();
    wrapper.update();
    expect(spy).toHaveBeenCalled();
  });

  it('should test for componentWillMount method call in BorrowedbooksTable page when bookData and data are empty ', () => {
    wrapper = shallow(<BorrowedbooksTable
      isRefreshed={initialState.refreshPage[0].isRefreshed}
      bookData={[]}
      item={initialState.returnBooks}
      data={[]}
      getunreturnedBooks={mockFuction}
      returnbook={mockFuction}
      getborrowedBooks={mockFuction}
      getbooks={mockFuction}
      refreshPage={mockFuction}
    />);
    const instance = wrapper.instance();
    const spy = jest.spyOn(instance, 'componentWillMount');
    instance.forceUpdate();
    wrapper.update();
    wrapper.instance().componentWillMount();
    wrapper.update();
    expect(spy).toHaveBeenCalled();
  });

  it('should test if handleClick function was called in borrowedbooks page', () => {
    const app = shallow(<BorrowedbooksTable
      isRefreshed={initialState.refreshPage[0].isRefreshed}
      bookData={initialState.books[0].data}
      item={initialState.returnBooks}
      data={initialState.getunreturnedBooks[0].data}
      getunreturnedBooks={mockFuction}
      returnbook={mockFuction}
      getborrowedBooks={mockFuction}
      getbooks={mockFuction}
      refreshPage={mockFuction}
    />);
    const instance = app.instance();
    const spy = jest.spyOn(instance, 'handleClick');
    instance.forceUpdate();
    instance.handleClick(e);
    expect(spy).toHaveBeenCalled();
  });

  it('should test if handleExit function was called in borrowedbooks page', () => {
    const app = shallow(<BorrowedbooksTable
      isRefreshed={initialState.refreshPage[0].isRefreshed}
      bookData={initialState.books[0].data}
      item={initialState.returnBooks}
      data={initialState.getunreturnedBooks[0].data}
      getunreturnedBooks={mockFuction}
      returnbook={mockFuction}
      getborrowedBooks={mockFuction}
      getbooks={mockFuction}
      refreshPage={mockFuction}
    />);
    const instance = app.instance();
    const spy = jest.spyOn(instance, 'handleExit');
    instance.forceUpdate();
    instance.handleExit(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should test if handleYes function was called in borrowedbooks page', () => {
    const app = shallow(<BorrowedbooksTable
      isRefreshed={initialState.refreshPage[0].isRefreshed}
      bookData={initialState.books[0].data}
      item={initialState.returnBooks}
      data={initialState.getunreturnedBooks[0].data}
      getunreturnedBooks={mockFuction}
      returnbook={mockFuction}
      getborrowedBooks={mockFuction}
      getbooks={mockFuction}
      refreshPage={mockFuction}
    />);
    const instance = app.instance();
    const spy = jest.spyOn(instance, 'handleYes');
    instance.forceUpdate();
    instance.handleYes(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should test if handleNo function was called in borrowedbooks page', () => {
    const app = shallow(<BorrowedbooksTable
      isRefreshed={initialState.refreshPage[0].isRefreshed}
      bookData={initialState.books[0].data}
      item={initialState.returnBooks}
      data={initialState.getunreturnedBooks[0].data}
      getunreturnedBooks={mockFuction}
      returnbook={mockFuction}
      getborrowedBooks={mockFuction}
      getbooks={mockFuction}
      refreshPage={mockFuction}
    />);
    const instance = app.instance();
    const spy = jest.spyOn(instance, 'handleNo');
    instance.forceUpdate();
    instance.handleNo(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should test for component will receiveprops methods call in Changepassword page when error message is not void ', () => {
    const nextProps = {
      data: books,
      isRefreshed: false,
      item: [{ error: 'error', data: 'good' }],

    };


    wrapper = shallow(<ChangePasswordPage
      item={initialState.returnBooks}
      changePassword={mockFuction}
    />);
    const instance = wrapper.instance();
    instance.setState({
      display: true,
    });
    const spy = jest.spyOn(instance, 'componentWillReceiveProps');
    instance.forceUpdate();
    wrapper.update();
    wrapper.instance().componentWillReceiveProps(nextProps);
    wrapper.update();
    expect(spy).toHaveBeenCalled();
  });

  it('should test for component will receiveprops methods call in Changepassword page when error message is void ', () => {
    const nextProps = {
      data: books,
      isRefreshed: false,
      item: [{ error: '', data: 'good' }],

    };


    wrapper = shallow(<ChangePasswordPage
      item={initialState.returnBooks}
      changePassword={mockFuction}
    />);
    const instance = wrapper.instance();
    instance.setState({
      display: true,
    });
    const spy = jest.spyOn(instance, 'componentWillReceiveProps');
    instance.forceUpdate();
    wrapper.update();
    wrapper.instance().componentWillReceiveProps(nextProps);
    wrapper.update();
    expect(spy).toHaveBeenCalled();
  });
  it('should test for component will receiveprops methods call in Changepassword page when display state is false', () => {
    const nextProps = {
      data: books,
      isRefreshed: false,
      item: [{ error: '', data: 'good' }],

    };


    wrapper = shallow(<ChangePasswordPage
      item={initialState.returnBooks}
      changePassword={mockFuction}
    />);
    const instance = wrapper.instance();
    instance.setState({
      display: false,
    });
    const spy = jest.spyOn(instance, 'componentWillReceiveProps');
    instance.forceUpdate();
    wrapper.update();
    wrapper.instance().componentWillReceiveProps(nextProps);
    wrapper.update();
    expect(spy).toHaveBeenCalled();
  });

  it('should test if handleClose function was called in changepassword page', () => {
    const app = shallow(<ChangePasswordPage
      item={initialState.returnBooks}
      changePassword={mockFuction}
    />);
    const instance = app.instance();
    const spy = jest.spyOn(instance, 'handleClose');
    instance.forceUpdate();
    instance.handleClose(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should test if handleExit function was called in changepassword page', () => {
    const app = shallow(<ChangePasswordPage
      item={initialState.returnBooks}
      changePassword={mockFuction}
    />);
    const instance = app.instance();
    const spy = jest.spyOn(instance, 'handleExit');
    instance.forceUpdate();
    instance.handleExit(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should test if handleClick function was called in changepassword page', () => {
    const app = shallow(<ChangePasswordPage
      item={initialState.returnBooks}
      changePassword={mockFuction}
    />);
    const instance = app.instance();
    const spy = jest.spyOn(instance, 'handleClick');
    instance.forceUpdate();
    instance.handleClick(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should test if handleInputChange function was called in changepassword page', () => {
    const app = shallow(<ChangePasswordPage
      item={initialState.returnBooks}
      changePassword={mockFuction}
    />);
    const instance = app.instance();
    const spy = jest.spyOn(instance, 'handleInputChange');
    instance.forceUpdate();
    instance.handleInputChange(e);
    expect(spy).toHaveBeenCalled();
  });

  it('should test if handleSave function was called in changepassword page', () => {
    const app = shallow(<ChangePasswordPage
      item={initialState.returnBooks}
      changePassword={mockFuction}
    />);
    const instance = app.instance();
    const spy = jest.spyOn(instance, 'handleSave');
    instance.forceUpdate();
    instance.handleSave(event);
    expect(spy).toHaveBeenCalled();
  });


  it('should test if handleSave function was called in changepassword page', () => {
    const app = shallow(<ChangePasswordPage
      item={initialState.returnBooks}
      changePassword={mockFuction}
    />);

    const instance = app.instance();
    instance.setState({
      newPassword: '1234567',
      oldPassword: '123456',
      confirmPassword: '1234567',
    });
    const spy = jest.spyOn(instance, 'handleSave');
    instance.forceUpdate();
    instance.handleSave(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should test if handleSave function was called in changepassword page', () => {
    const app = shallow(<ChangePasswordPage
      item={initialState.returnBooks}
      changePassword={mockFuction}
    />);

    const instance = app.instance();
    instance.setState({
      newPassword: '12345790',
      oldPassword: '123456',
      confirmPassword: '1234567',
    });
    const spy = jest.spyOn(instance, 'handleSave');
    instance.forceUpdate();
    instance.handleSave(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should test if handleSave function was called in changepassword page', () => {
    const app = shallow(<ChangePasswordPage
      item={initialState.returnBooks}
      changePassword={mockFuction}
    />);

    const instance = app.instance();
    instance.setState({
      newPassword: '12345',
      oldPassword: '123456',
      confirmPassword: '12345',
    });
    const spy = jest.spyOn(instance, 'handleSave');
    instance.forceUpdate();
    instance.handleSave(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should test for component will receiveprops methods call in DashboardSidebar page when show state is false', () => {
    const nextProps = {
      data: user,
      isRefreshed: false,
      item: [{ error: '', data: 'good' }],
      imageUrl: 'l8.jpg',


    };


    wrapper = shallow(<DashboardSidebar
      data={initialState.UserDetails[0].data}
      imageUrl={initialState.userProfileImage[0].response}
      error={initialState.updateUser[0].error.toString()}
      message={initialState.updateUser[0].data.toString()}
      updateUser={mockFuction}
      uploadAvatar={mockFuction}

    />);
    const instance = wrapper.instance();
    instance.setState({
      show: false,
    });
    const spy = jest.spyOn(instance, 'componentWillReceiveProps');
    instance.forceUpdate();
    wrapper.update();
    wrapper.instance().componentWillReceiveProps(nextProps);
    wrapper.update();
    expect(spy).toHaveBeenCalled();
  });

  it('should test for component will receiveprops methods call in DashboardSidebar page when show state is true and error message is not void', () => {
    const nextProps = {
      data: user,
      isRefreshed: false,
      item: [{ error: '', data: 'good' }],

    };


    wrapper = shallow(<DashboardSidebar
      data={initialState.UserDetails[0].data}
      imageUrl={initialState.userProfileImage[0].response}
      error={'error'}
      message={''}
      updateUser={mockFuction}
      uploadAvatar={mockFuction}

    />);
    const instance = wrapper.instance();
    instance.setState({
      show: true,
    });
    const spy = jest.spyOn(instance, 'componentWillReceiveProps');
    instance.forceUpdate();
    wrapper.update();
    wrapper.instance().componentWillReceiveProps(nextProps);
    wrapper.update();
    expect(spy).toHaveBeenCalled();
  });

  it('should test for component will receiveprops methods call in DashboardSidebar page when show state is true and error message is void', () => {
    const nextProps = {
      data: user,
      isRefreshed: false,
      item: [{ error: '', data: 'good' }],
      imageUrl: 'l8.jpg',

    };


    wrapper = shallow(<DashboardSidebar
      data={initialState.UserDetails[0].data}
      imageUrl={initialState.userProfileImage[0].response}
      error={''}
      message={'ok'}
      updateUser={mockFuction}
      uploadAvatar={mockFuction}

    />);
    const instance = wrapper.instance();
    instance.setState({
      show: true,
      imageloaded: true,
    });
    const spy = jest.spyOn(instance, 'componentWillReceiveProps');
    instance.forceUpdate();
    wrapper.update();
    wrapper.instance().componentWillReceiveProps(nextProps);
    wrapper.update();
    expect(spy).toHaveBeenCalled();
  });

  it('should test if handleclick function was called dashboard side bar component', () => {
    const app = shallow(<DashboardSidebar
      data={initialState.UserDetails[0].data}
      imageUrl={initialState.userProfileImage[0].response}
      error={''}
      message={'ok'}
      updateUser={mockFuction}
      uploadAvatar={mockFuction}
    />);

    const instance = app.instance();
    const spy = jest.spyOn(instance, 'handleClick');
    instance.forceUpdate();
    instance.handleClick(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should test if handleclose function was called dashboard side bar component', () => {
    const app = shallow(<DashboardSidebar
      data={initialState.UserDetails[0].data}
      imageUrl={initialState.userProfileImage[0].response}
      error={''}
      message={'ok'}
      updateUser={mockFuction}
      uploadAvatar={mockFuction}
    />);

    const instance = app.instance();
    const spy = jest.spyOn(instance, 'handleClose');
    instance.forceUpdate();
    instance.handleClose(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should test if handleExit function was called dashboard side bar component', () => {
    const app = shallow(<DashboardSidebar
      data={initialState.UserDetails[0].data}
      imageUrl={initialState.userProfileImage[0].response}
      error={''}
      message={'ok'}
      updateUser={mockFuction}
      uploadAvatar={mockFuction}
    />);

    const instance = app.instance();
    const spy = jest.spyOn(instance, 'handleExit');
    instance.forceUpdate();
    instance.handleExit(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should test if handleEdit function was called dashboard side bar component when required parameters are not inputed', () => {
    const app = shallow(<DashboardSidebar
      data={initialState.UserDetails[0].data}
      imageUrl={initialState.userProfileImage[0].response}
      error={''}
      message={'ok'}
      updateUser={mockFuction}
      uploadAvatar={mockFuction}
    />);

    const instance = app.instance();
    const spy = jest.spyOn(instance, 'handleEdit');
    instance.forceUpdate();
    instance.handleEdit(event);
    expect(spy).toHaveBeenCalled();
  });


  it('should test if handleEdit function was called in dashboard side bar component when required parammeters are inputed', () => {
    const app = shallow(<DashboardSidebar
      data={initialState.UserDetails[0].data}
      imageUrl={initialState.userProfileImage[0].response}
      error={''}
      message={'ok'}
      updateUser={mockFuction}
      uploadAvatar={mockFuction}
    />);

    const instance = app.instance();
    instance.setState({
      imageHeight: 100,
      file: 'l8.jpg',
      imageWidth: 149,
      imageSize: 50,

    });
    const spy = jest.spyOn(instance, 'handleEdit');
    instance.forceUpdate();
    instance.handleEdit(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should test if handleEdit function was called in dashboard side bar component when image height is more than 200', () => {
    const app = shallow(<DashboardSidebar
      data={initialState.UserDetails[0].data}
      imageUrl={initialState.userProfileImage[0].response}
      error={''}
      message={'ok'}
      updateUser={mockFuction}
      uploadAvatar={mockFuction}
    />);

    const instance = app.instance();
    instance.setState({
      imageHeight: 300,
      file: 'l8.jpg',
      imageWidth: 249,
      imageSize: 50,

    });
    const spy = jest.spyOn(instance, 'handleEdit');
    instance.forceUpdate();
    instance.handleEdit(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should test if handleEdit function was called in dashboard side bar component when required parammeters are inputed', () => {
    const app = shallow(<DashboardSidebar
      data={initialState.UserDetails[0].data}
      imageUrl={initialState.userProfileImage[0].response}
      error={''}
      message={'ok'}
      updateUser={mockFuction}
      uploadAvatar={mockFuction}
    />);

    const instance = app.instance();
    instance.setState({
      imageHeight: 100,
      file: 'l8.jpg',
      imageWidth: 149,
      imageSize: 500000,

    });
    const spy = jest.spyOn(instance, 'handleEdit');
    instance.forceUpdate();
    instance.handleEdit(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should test if handleImage function was called in dashboard side bar component when required parammeters are inputed', () => {
    const app = shallow(<DashboardSidebar
      data={initialState.UserDetails[0].data}
      imageUrl={initialState.userProfileImage[0].response}
      error={''}
      message={'ok'}
      updateUser={mockFuction}
      uploadAvatar={mockFuction}
    />);

    const instance = app.instance();
    const spy = jest.spyOn(instance, 'handleImageChange');
    instance.forceUpdate();
    instance.handleImageChange(e, false);
    expect(spy).toHaveBeenCalled();
  });

  it('should test if handleClickBookShelf function was called dashboard side bar component', () => {
    const app = shallow(<DashboardSidebar
      data={initialState.UserDetails[0].data}
      imageUrl={initialState.userProfileImage[0].response}
      error={''}
      message={'ok'}
      updateUser={mockFuction}
      uploadAvatar={mockFuction}
    />);

    const instance = app.instance();
    const spy = jest.spyOn(instance, 'handleClickBookShelf');
    instance.forceUpdate();
    instance.handleClickBookShelf(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should test if  handleClickAccount function was called dashboard side bar component', () => {
    const app = shallow(<DashboardSidebar
      data={initialState.UserDetails[0].data}
      imageUrl={initialState.userProfileImage[0].response}
      error={''}
      message={'ok'}
      updateUser={mockFuction}
      uploadAvatar={mockFuction}
    />);

    const instance = app.instance();
    const spy = jest.spyOn(instance, 'handleClickAccount');
    instance.forceUpdate();
    instance.handleClickAccount(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should test if  handleClickHistory function was called dashboard side bar component', () => {
    const app = shallow(<DashboardSidebar
      data={initialState.UserDetails[0].data}
      imageUrl={initialState.userProfileImage[0].response}
      error={''}
      message={'ok'}
      updateUser={mockFuction}
      uploadAvatar={mockFuction}
    />);

    const instance = app.instance();
    const spy = jest.spyOn(instance, 'handleClickHistory');
    instance.forceUpdate();
    instance.handleClickHistory(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should test if handleChangePassword function was called dashboard side bar component', () => {
    const app = shallow(<DashboardSidebar
      data={initialState.UserDetails[0].data}
      imageUrl={initialState.userProfileImage[0].response}
      error={''}
      message={'ok'}
      updateUser={mockFuction}
      uploadAvatar={mockFuction}
    />);

    const instance = app.instance();
    instance.setState({
      imagePreviewUrl: 'l8.jpg',
    });
    const spy = jest.spyOn(instance, 'handleChangePassword');
    instance.forceUpdate();
    instance.handleChangePassword(event);
    expect(spy).toHaveBeenCalled();
  });
});

