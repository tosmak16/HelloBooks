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
window.localStorage.setItem('bookTitle', books[0].bookTitle);

localStorage.setItem('category', books[0].category);
localStorage.setItem('isbn', books[0].isbn);
localStorage.setItem('stocknumber', books[0].stocknumber);
localStorage.setItem('author', books[0].author);
localStorage.setItem('summary', books[0].summary);

localStorage.removeItem('bookId');
localStorage.removeItem('id');

localStorage.removeItem('category');
localStorage.removeItem('isbn');
localStorage.removeItem('stocknumber');
localStorage.removeItem('author');
localStorage.removeItem('summary');
localStorage.removeItem('bookTitle');
localStorage.removeItem('image');


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
    window.localStorage.setItem('bookId', '1');
    $(document).ready(() => {
      $('.modal').modal();
    });
    wrapper = mount(<Provider store={store}><ConnectedBookDetailsPage /></Provider>);
  });

  it('should test and take snapshot of booksDetailsPage', () => {
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

  it('should test and take snapshot of books detailsPage when data and book array are empty', () => {
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

  it('should test and take snapshot of details form when data and book array are empty', () => {
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
  it('should test if BookDetails component props contains error message on on update', () => {
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
    wrapper.instance().handleFuction = mockFuction;
    wrapper.update();
    wrapper.instance().setState({
      display: 'block',
    });
    wrapper.update();
    wrapper.instance().componentWillReceiveProps(nextProps);
    wrapper.instance().componentWillMount();
    wrapper.instance().componentWillUnmount();
    wrapper.instance().handleClick(event);
    wrapper.instance().handleOpen(event);
    wrapper.instance().handleExit(event);
    wrapper.instance().handleClose(event);
  });
  it('should test if BookDetails component display state is block', () => {
    const nextProps = {
      borrowBookItem: [{ error: 'there is error', response: 'success' }]
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
    wrapper.instance().handleFuction = mockFuction;
    wrapper.instance().setState({
      display: 'block',
    });
    wrapper.instance().componentWillReceiveProps(nextProps);;
    wrapper.instance().componentWillMount();
  });

  it('should test if BookDetails component props contains error message on on update', () => {
    const nextProps = {
      borrowBookItem: [{ error: 'there is error', response: 'success' }]
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
    wrapper.instance().handleFuction = mockFuction;
    wrapper.update();
    wrapper.instance().setState({
      display: '',
    });
    wrapper.update();
    wrapper.instance().componentWillReceiveProps(nextProps);
    wrapper.instance().componentWillMount();
    wrapper.update();
  });

})
