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
    sortedData: '',
    categoryData: { selectedCategory: 'action', category: 'action', categoryData: book }
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

  it('should render and take snapshot of booksPage', () => {
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

  it('should render and take snapshot of booksFilterPage when bookIsFound is true', () => {
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

  it('should render and take snapshot of booksFilterPage when bookIsFound is false', () => {
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

  it('should render and take snapshot of booksCollectionPage', () => {
    const tree = render.create(<BooksCollection
      bookData={[{ name: 'hello', image: '', id: 1 }]}
      checkBookDetails={mockFuction}
      heading={'hello'}
      state={state}
    />);
    expect(tree).toMatchSnapshot();
  });


  it('should render and take snapshot of booksCategoryPage', () => {
    const tree = render.create(<BooksCategory
      categoryData={[]}
      data={[{ name: 'hello', image: '', id: 1 }]}
      checkBookDetails={mockFuction}
      state={state}
    />);
    expect(tree).toMatchSnapshot();
  });

  it('should render and take snapshot of booksphotoPage', () => {
    const tree = render.create(<BooksPhoto
      data={[{ name: 'hello', image: '', id: 1 }]}
      checkBookDetails={mockFuction}
      bookData={book}
    />);
    expect(tree).toMatchSnapshot();
  });


  it('should render and take snapshot of Side Bar', () => {
    const tree = render.create(<SideBar
      data={book}
      bookData={book}
      showbooksByCategory={mockFuction}
      handleClick={mockFuction}
      handleCollapse={mockFuction}
    />);
    expect(tree).toMatchSnapshot();
  });

  it('should render the connected BooksPage component', () => {
    expect(wrapper.find(ConnectedBooksPage).length).toEqual(1);
  });

  it('it should checks Prop matches with initialState', () => {
    expect(wrapper.find(BooksPage).prop('bookData')).toEqual(initialState.books[0].data);
    expect(wrapper.find(BooksPage).prop('isFetched')).toEqual(initialState.books[0].isFetched);
    expect(wrapper.find(BooksPage).prop('categoryData')).toEqual(initialState.category);
    expect(wrapper.find(BooksPage).prop('filteredData')).toEqual(initialState.filteredBooks[0].filteredData);
  });

  it('should render and take snapshot of Card box', () => {
    const component = render.create(<Cardbox
      item={book[0]}
      handleClick={mockFuction}
      checkBookDetails={mockFuction}
    />);
    expect(component).toMatchSnapshot();
  });

  it('should call showbooksByCategory function when handle click function is called', () => {
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
    expect(wrapper.instance().props.showbooksByCategory).toHaveBeenCalled();
  });

  it('should trigger collapsible when handle collapse function in sidbar component is called', () => {
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
    wrapper.find('.collapsible').last().exists();
  });
  it('should trigger checkBookDetails function when handleClick function is called in cardbox component', () => {
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
    expect(wrapper.instance().props.checkBookDetails).toHaveBeenCalled();
  });
  it('should render BooksCollection component without crashing', () => {
    wrapper = shallow(<BooksCollection
      bookData={book}
      checkBookDetails={mockFuction}
      heading={'hello'}
    />);
  });

  it('should clear local storage when BooksPage component will mount', () => {
    wrapper = shallow(<BooksPage
      categoryData={books}
      checkBookDetails={mockFuction}
      bookData={book}
      filteredData={book}
      getBooks={mockFuction}
      isFetched={true}
      searchBook={mockFuction}
      displayBooksByCategory={mockFuction}
    />);
    wrapper.instance().componentWillMount();
    expect(window.localStorage.id).toBe(undefined);
    expect(window.localStorage.bookId).toBe(undefined);
    expect(window.localStorage.category).toBe(undefined);
  });
  it('should call getBooks function when BooksPage component did mount', () => {
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
    wrapper.instance().componentDidMount();
    expect(wrapper.instance().props.getBooks).toHaveBeenCalled();
  });
  it('should update sortedData state when BooksPage component receive new props', () => {
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
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.instance().state.sortedData).toBe(nextProps.categoryData[0]);
  });
  it('should not update sortedData state when BooksPage component receive new props that is empty', () => {
    const nextProps = {
      categoryData: []
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
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.instance().state.sortedData).toBe('');
  });
  it('should update component state when bookFilterHandleChange is called', () => {
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
    wrapper.instance().setState({
      filterBy: 'author',
      searchText: 'nnenka'
    });
    wrapper.instance().bookFilterHandleChange(e);
    expect(wrapper.instance().state[e.target.name]).toBe(e.target.value);
    expect(wrapper.instance().state.booksCollectionDisplay).toBe(true);
    expect(wrapper.instance().props.searchBook).toHaveBeenCalled();
  });
  it('should not update component state when bookFilterHandleChange is called', () => {
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
    wrapper.instance().setState({
      filterBy: 'author',
      searchText: ''
    });
    expect(wrapper.instance().state.booksCollectionDisplay).toBe(false);
    wrapper.instance().bookFilterHandleChange(e);
    expect(wrapper.instance().state.booksCollectionDisplay).toBe(false);
  });
  it('should render and take snapshot of booksphotoPage when available books is one', () => {
    const tree = shallow(<BooksPhoto
      data={[{ name: 'hello', image: '', id: 1 }]}
      checkBookDetails={mockFuction}
      bookData={[book[0]]}
    />);
  });
  it('should update component state when bookFilterHandleSelected is called', () => {
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
    wrapper.instance().bookFilterHandleSelected(e);
    expect(wrapper.instance().state[e.target.name]).toBe(e.target.value);
    expect(wrapper.instance().state.bookIsFound).toBe(false);
  });
  it('should update component state when bookCollectionHandleClick is called', () => {
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
    wrapper.instance().bookCollectionHandleClick(e);
    expect(wrapper.instance().props.checkBookDetails).toHaveBeenCalled();
  });
});
