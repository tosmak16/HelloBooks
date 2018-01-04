import React from 'react';
import { mount, shallow } from 'enzyme';
import render from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import expect from 'expect';
import thunk from 'redux-thunk';
import $ from 'jquery';
import ConnectedBooksPage, { BooksPage } from '../../src/components/Books/BooksPage';
import localStorageMock from '../../__mock__/localStorage';
import books from '../../__mock__/book';
import BooksFilter from '../../src/components/Books/BooksFilter';
import BooksCollection from '../../src/components/Books/BooksCollection';
import BooksCategory from '../../src/components/Books/BooksCategory';
import BooksPhoto from '../../src/components/Books/BooksPhoto';
import SideBar from '../../src/components/SideBar';
import { e, event } from '../../__mock__/event';
import Cardbox from '../../src/components/Books/Cardbox';
import book from '../../__mock__/book';


const middlewares = [thunk]; // add your middlewares like `redux-thunk

const mockFuction = jest.fn();
window.localStorage = localStorageMock;
window.localStorage.setItem('id', 1);

describe('Test BooksPage component', () => {
  const state = {
    filterBy: '',
    searchText: '',
    error: '',
    booksCollectionDisplay: true,
    bookIsFound: true,
    sortedData: ''
  };
  const initialState = {
    books: [{
      isFetching: false,
      isFetched: false,
      data: [],
      error: '',
    }],
    category: [{
      category: '',
      categoryData: '',
      selectedCategory: false,
    }],
    filteredBooks: [{
      filteredData: [],
    }]
  };
  const mockStore = configureMockStore(middlewares);
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    window.localStorage = localStorageMock;
    wrapper = mount(<Provider store={store}><ConnectedBooksPage /></Provider>);
  });

  it('should test and take snapshot of booksPage', () => {
    const tree = render.create(<BooksPage
      categoryData={[]}
      isFetched={!initialState.books[0].isFetched}
      getBooks={mockFuction}
      bookData={[{ id: 1, name: 'hello' }]}
      displayBooksByCategory={mockFuction}
      filteredData={[{ id: 1, bookTitle: 'love' }]}
      checkBookDetails={mockFuction}
      searchBook={mockFuction}
    />);
    expect(tree).toMatchSnapshot();
  });

  it('should test and take snapshot of booksFilterPage when bookIsFound is true', () => {
    const tree = render.create(<BooksFilter
      data={[{ name: 'hello' }]}
      filteredData={[{ id: 1, bookTitle: 'love' }]}
      checkBookDetails={mockFuction}
      searchBook={mockFuction}
      state={state}
      handleChange={mockFuction}
      handleSelected={mockFuction}
    />);
    expect(tree).toMatchSnapshot();
  });

  it('should test and take snapshot of booksFilterPage when bookIsFound is false', () => {
    const tree = render.create(<BooksFilter
      data={[{ name: 'hello' }]}
      filteredData={[]}
      checkBookDetails={mockFuction}
      searchbooks={mockFuction}
      state={state}
      handleChange={mockFuction}
      handleSelected={mockFuction}
    />);
    expect(tree).toMatchSnapshot();
  });

  it('should test and take snapshot of booksCollectionPage', () => {
    const tree = render.create(<BooksCollection
      bookData={[{ name: 'hello', image: '', id: 1 }]}
      checkBookDetails={mockFuction}
      heading={'hello'}
    />);
    expect(tree).toMatchSnapshot();
  });


  it('should test and take snapshot of booksCategoryPage', () => {
    const tree = render.create(<BooksCategory
      categoryData={[]}
      data={[{ name: 'hello', image: '', id: 1 }]}
      checkBookDetails={mockFuction}
      state={state}
    />);
    expect(tree).toMatchSnapshot();
  });

  it('should test and take snapshot of booksphotoPage', () => {
    const tree = render.create(<BooksPhoto
      data={[{ name: 'hello', image: '', id: 1 }]}
      checkBookDetails={mockFuction}
      bookData={book}
    />);
    expect(tree).toMatchSnapshot();
  });

  it('should test and take snapshot of Side Bar', () => {
    const tree = render.create(<SideBar
      data={book}
      bookData={book}
      showbooksByCategory={mockFuction}
      handleClick={mockFuction}
      handleCollapse={mockFuction}
    />);
    expect(tree).toMatchSnapshot();
  });

  it('should render the connected component', () => {
    expect(wrapper.find(ConnectedBooksPage).length).toEqual(1);
  });

  it('it should checks Prop matches with initialState', () => {
    expect(wrapper.find(BooksPage).prop('bookData')).toEqual(initialState.books[0].data);
    expect(wrapper.find(BooksPage).prop('isFetched')).toEqual(initialState.books[0].isFetched);
    expect(wrapper.find(BooksPage).prop('categoryData')).toEqual(initialState.category);
    expect(wrapper.find(BooksPage).prop('filteredData')).toEqual(initialState.filteredBooks[0].filteredData);
  });

  it('should test and take snapshot of Card box', () => {
    const component = render.create(<Cardbox
      item={book[0]}
      handleClick={mockFuction}
      checkBookDetails={mockFuction}
    />);
    expect(component).toMatchSnapshot();
  });

  it('should test for handle click function in sidbar component', () => {
    wrapper = shallow(<SideBar
      data={book}
      bookData={book}
      showbooksByCategory={mockFuction}
    />);
    wrapper.find('Link').last().simulate('click', {
      target: {
        name: 'click function'
      }
    });
    wrapper.instance().handleFuction = mockFuction;
    wrapper.update();
    wrapper.instance().props
  });

  it('should test for handle collapse function in sidbar component', () => {
    wrapper = shallow(<SideBar
      data={[{ name: 'hello', image: '', id: 1 }]}
      bookData={book}
      showbooksByCategory={mockFuction}
    />);
    wrapper.find('Link.heada').last().simulate('click', {
      target: {
        name: 'click function'
      }
    });
    wrapper.instance().handleFuction = mockFuction;
    wrapper.update();
  });

  it('should test for handle click function in cardbox component', () => {
    wrapper = shallow(<Cardbox
      item={book[0]}
      handleClick={mockFuction}
      checkBookDetails={mockFuction}
    />);
    wrapper.find('button').simulate('click', {
      target: {
        name: 'click function'
      }
    });
  });

  it('should test for handle click function in BooksCollection component', () => {
    wrapper = shallow(<BooksCollection
      bookData={book}
      checkBookDetails={mockFuction}
      heading={'hello'}
    />);
    wrapper.instance().handleFuction = mockFuction;
    wrapper.update();
  });

  it('should test for componeneWillReceiveProps function in BooksCategory component', () => {
    const nextProps = {
      categoryData: [{ category: books }]
    };
    wrapper = shallow(<BooksPage
      categoryData={books}
      checkBookDetails={mockFuction}
      bookData={book}
      filteredData={book}
      getBooks={mockFuction}
      isFetched={false}
      searchBook={mockFuction}
      displayBooksByCategory={mockFuction}
    />);
    wrapper.instance().handleFuction = mockFuction;
    wrapper.update();
    wrapper.instance().setState({
      filterBy: 'author',
      searchText: 'cfgcghvhgv'
    });
    wrapper.update();
    wrapper.instance().componentWillReceiveProps(nextProps);
    wrapper.update();
    wrapper.instance().bookCollectionHandleClick(e, false);
    wrapper.update();
    wrapper.instance().componentWillMount();
    wrapper.update();
    wrapper.instance().bookFilterHandleChange(e);
    wrapper.update();
    wrapper.instance().bookFilterHandleSelected(e);
    wrapper.update();
    wrapper.instance().bookCollectionHandleClick(e);
    wrapper.update();
  });


  it('should test for componeneWillReceiveProps function in BooksCategory component', () => {
    const nextProps = {
      categoryData: []
    };
    wrapper = shallow(<BooksPage
      categoryData={books}
      checkBookDetails={mockFuction}
      bookData={[]}
      filteredData={book}
      getBooks={mockFuction}
      isFetched={false}
      searchBook={mockFuction}
      displayBooksByCategory={mockFuction}
    />);
    wrapper.instance().handleFuction = mockFuction;
    wrapper.update();
    wrapper.instance().setState({
      filterBy: '',
      searchText: ''
    });
    wrapper.update();
    wrapper.instance().componentWillReceiveProps(nextProps);
    wrapper.update();
    wrapper.instance().bookCollectionHandleClick(e, false);
    wrapper.update();
    wrapper.instance().componentWillMount();
    wrapper.update();
    wrapper.instance().bookFilterHandleChange(e);
    wrapper.update();
    wrapper.instance().bookFilterHandleSelected(e);
    wrapper.update();
    wrapper.instance().bookCollectionHandleClick(e);
    wrapper.update();
  });

});
