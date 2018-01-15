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
import SideBar from '../../src/components/SideBar';
import ConnectedBookDetailsPage, { BookDetailsPage } from '../../src/components/BookDetail/BookDetailsPage';
import DetailsForm from '../../src/components/BookDetail/DetailsForm';

const middlewares = [thunk]; // add your middlewares like `redux-thunk
const mockFuction = jest.fn();

const mockStore = configureMockStore(middlewares);
let store;
let wrapper;
window.localStorage = localStorageMock;

localStorage.setItem('image', books[0].image);
localStorage.setItem('bookTitle', books[0].bookTitle);

localStorage.setItem('category', books[0].category);
localStorage.setItem('isbn', books[0].isbn);
localStorage.setItem('stocknumber', books[0].stocknumber);
localStorage.setItem('author', books[0].author);
localStorage.setItem('summary', books[0].summary);



describe('Test book Details page components and container', () => {
  const initialState = {
    books: [{
      isFetching: false,
      isFetched: true,
      data: books,
      error: '',
    }],
    selectedBookDetails: [{
      bookId: '1',
    }],
    borrowBooks: [{
      isStored: false,
      data: {},
      error: '',
      isSending: false,
      response: ''
    }],
  };

  const nextProps = {
    item: [{
      isStored: false,
      data: {},
      error: 'error',
      isSending: false,
      response: 'helo'
    }]
  };

  const nextProp = {
    item: [{
      isStored: false,
      data: {},
      error: '',
      isSending: false,
      response: 'helo'
    }]
  };

  store = mockStore(initialState);

  beforeEach(() => {
    $(document).ready(() => {
      $('.modal').modal();
    });
    wrapper = mount(<Provider store={store}><ConnectedBookDetailsPage /></Provider>);
  });

  it('should render and take snapshot of booksDetailsPage', () => {
    const tree = render.create(<BookDetailsPage
      bookData={initialState.books[0].data}
      book={initialState.selectedBookDetails}
      borrowBookItem={initialState.borrowBooks}
      borrowBook={mockFuction}
      checkBookDetails={mockFuction}
      displayBooksByCategory={mockFuction}
    />);
    expect(tree).toMatchSnapshot();
  });

  it('should render and take snapshot of books detailsPage when data and book array are empty', () => {
    const tree = render.create(<BookDetailsPage
      bookData={[]}
      book={[]}
      borrowBookItem={initialState.borrowBooks}
      borrowBook={mockFuction}
      checkBookDetails={mockFuction}
      displayBooksByCategory={mockFuction}

    />);
    expect(tree).toMatchSnapshot();
  });

  it('should render and take snapshot of details form when data and book array are empty', () => {
    const tree = render.create(<DetailsForm
      bookData={[]}
      book={[]}
      borrowBookItem={initialState.borrowBooks}
      borrowBooks={mockFuction}
      checkBookDetails={mockFuction}
      showbooksByCategory={mockFuction}

    />);
    expect(tree).toMatchSnapshot();
  });
  it('should call checkBookDetails when BookDetails component mount', () => {
    window.localStorage.setItem('bookId', '1');
    const nextProps = {
      borrowBookItem: [{ error: '', response: 'success' }]
    };
    wrapper = shallow(<DetailsForm
      bookData={books}
      borrowBooks={mockFuction}
      book={books}
      filteredData={books}
      getbooks={mockFuction}
      borrowBookItem={books}
      checkBookDetails={mockFuction}
      showbooksByCategory={mockFuction}
    />);
    wrapper.instance().componentWillMount();
    expect(wrapper.instance().props.checkBookDetails).toHaveBeenCalled();
  });
  it('should call checkBookDetails when BookDetails component mount', () => {
    window.localStorage.setItem('bookId', '1');
    const nextProps = {
      borrowBookItem: [{ error: '', response: 'success' }]
    };
    wrapper = shallow(<DetailsForm
      bookData={books}
      borrowBooks={mockFuction}
      book={books}
      filteredData={books}
      getbooks={mockFuction}
      borrowBookItem={books}
      checkBookDetails={mockFuction}
      showbooksByCategory={mockFuction}
    />);
    wrapper.instance().componentWillMount();
    expect(wrapper.instance().props.checkBookDetails).toHaveBeenCalled();
  });
  it('should update sate when BookDetails component mount and book Id exist in locals storage', () => {
    window.localStorage.setItem('id', '1');
    const nextProps = {
      borrowBookItem: [{ error: '', response: 'success' }]
    };
    wrapper = shallow(<DetailsForm
      bookData={books}
      borrowBooks={mockFuction}
      book={books}
      filteredData={books}
      getbooks={mockFuction}
      borrowBookItem={books}
      checkBookDetails={mockFuction}
      showbooksByCategory={mockFuction}
    />);
    wrapper.instance().componentWillMount();
    expect(wrapper.instance().state.bookData).toEqual([]);
  });
  it('should update sate when handle click function is called', () => {
    wrapper = shallow(<DetailsForm
      bookData={books}
      borrowBooks={mockFuction}
      book={books}
      filteredData={books}
      getbooks={mockFuction}
      borrowBookItem={books}
      checkBookDetails={mockFuction}
      showbooksByCategory={mockFuction}
    />);
    wrapper.instance().handleClick(event);
    expect(wrapper.instance().state.display).toEqual(true);
    expect(wrapper.instance().state.displayPreloader).toEqual('block');
  });
  it('should update error fix sate when handle open function is called', () => {
    wrapper = shallow(<DetailsForm
      bookData={books}
      borrowBooks={mockFuction}
      book={books}
      filteredData={books}
      getbooks={mockFuction}
      borrowBookItem={books}
      checkBookDetails={mockFuction}
      showbooksByCategory={mockFuction}
    />);
    wrapper.instance().handleOpen(event);
    expect(wrapper.instance().state.errorFix).toEqual(true);
  });
  it('should update error fix sate when handle close function is called', () => {
    wrapper = shallow(<DetailsForm
      bookData={books}
      borrowBooks={mockFuction}
      book={books}
      filteredData={books}
      getbooks={mockFuction}
      borrowBookItem={books}
      checkBookDetails={mockFuction}
      showbooksByCategory={mockFuction}
    />);
    wrapper.instance().handleClose(event);
    expect(wrapper.instance().state.errorFix).toEqual(true);
  });
  it('should update error fix sate when handle close function is called', () => {
    wrapper = shallow(<DetailsForm
      bookData={books}
      borrowBooks={mockFuction}
      book={books}
      filteredData={books}
      getbooks={mockFuction}
      borrowBookItem={books}
      checkBookDetails={mockFuction}
      showbooksByCategory={mockFuction}
    />);
    wrapper.instance().handleExit(event);
    expect(wrapper.instance().state.errorFix).toEqual(true);
  });
  it('should update error fix sate when handle close function is called', () => {
    wrapper = shallow(<DetailsForm
      bookData={books}
      borrowBooks={mockFuction}
      book={books}
      filteredData={books}
      getbooks={mockFuction}
      borrowBookItem={books}
      checkBookDetails={mockFuction}
      showbooksByCategory={mockFuction}
    />);
    wrapper.instance().componentWillUnmount();
    expect(window.localStorage.bookId).toEqual(undefined);
  });
  it('should update message state when BookDetails component receieve props with success message and display is block ', () => {
    const nextProps = {
      borrowBookItem: [{ error: '', response: 'success' }]
    };
    window.localStorage.setItem('bookId', '2');
    wrapper = shallow(<DetailsForm
      bookData={books}
      borrowBooks={mockFuction}
      book={books}
      filteredData={books}
      getbooks={mockFuction}
      borrowBookItem={books}
      checkBookDetails={mockFuction}
      showbooksByCategory={mockFuction}
    />);
    wrapper.instance().handleFuction = mockFuction;
    wrapper.update();
    wrapper.instance().setState({
      display: 'block',
    });
    wrapper.update();
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.instance().state.message).toEqual(nextProps.borrowBookItem[0].response);
  });
  it('should update error state when BookDetails component receive props with error and display is block ', () => {
    const nextProps = {
      borrowBookItem: [{ error: 'there is error', response: 'success' }]
    };
    window.localStorage.setItem('bookId', '1');
    wrapper = shallow(<DetailsForm
      bookData={books}
      borrowBooks={mockFuction}
      book={books}
      filteredData={books}
      getbooks={mockFuction}
      borrowBookItem={books}
      checkBookDetails={mockFuction}
      showbooksByCategory={mockFuction}
    />);
    wrapper.instance().handleFuction = mockFuction;
    wrapper.instance().setState({
      display: 'block',
    });
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.instance().state.error).toEqual(nextProps.borrowBookItem[0].error);
  });
  it('should not update error state when BookDetails component receive props with error and display is not block ', () => {
    const nextProps = {
      borrowBookItem: [{ error: 'there is error', response: '' }]
    };
    localStorage.removeItem('id');
    wrapper = shallow(<DetailsForm
      bookData={books}
      borrowBooks={mockFuction}
      book={books}
      filteredData={books}
      getbooks={mockFuction}
      borrowBookItem={books}
      checkBookDetails={mockFuction}
      showbooksByCategory={mockFuction}
    />);
    wrapper.instance().handleFuction = mockFuction;
    wrapper.update();
    wrapper.instance().setState({
      display: '',
    });
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.instance().state.error).toEqual('');
  });
  it('should not update error and message state when BookDetails component receive empty and display is block ', () => {
    const nextProps = {
      borrowBookItem: [{ error: '', response: '' }]
    };
    localStorage.removeItem('id');
    wrapper = shallow(<DetailsForm
      bookData={books}
      borrowBooks={mockFuction}
      book={books}
      filteredData={books}
      getbooks={mockFuction}
      borrowBookItem={books}
      checkBookDetails={mockFuction}
      showbooksByCategory={mockFuction}
    />);
    wrapper.instance().handleFuction = mockFuction;
    wrapper.update();
    wrapper.instance().setState({
      display: 'block',
    });
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.instance().state.displayPreloader).toEqual('none');
  });
})
