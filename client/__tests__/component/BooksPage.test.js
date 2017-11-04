import React from 'react';
import { mount, shallow } from 'enzyme';
import render from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import expect from 'expect';
import thunk from 'redux-thunk';


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


const middlewares = [thunk]; // add your middlewares like `redux-thunk

const mockFuction = jest.fn();


describe('Test BooksPage component', () => {
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
    getFilteredBooks: [{
      filteredData: [],
    }]
  };
  const mockStore = configureMockStore(middlewares);
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    window.localStorage = localStorageMock;


    wrapper = mount(<Provider store={ store }><ConnectedBooksPage /></Provider>);
  });

  it('should test and take snapshot of booksPage', () => {
    const tree = render.create(<BooksPage
      categoryData={ [] }
      isFetched={ !initialState.books[0].isFetched }
      getbooks={ mockFuction }
      data={ [{ id: 1, name: 'hello' }] }
      showbooksByCategory={ mockFuction }
      filteredData={ [{ id: 1, bookTitle: 'love' }] }
      checkBookDetails={ mockFuction }
      searchbooks={ mockFuction }
    />);
    expect(tree).toMatchSnapshot();
  });

  it('should test and take snapshot of booksFilterPage', () => {
    const tree = render.create(<BooksFilter
      data={ [{ name: 'hello' }] }
      filteredData={ [{ id: 1, bookTitle: 'love' }] }
      checkBookDetails={ mockFuction }
      searchbooks={ mockFuction }
    />);
    expect(tree).toMatchSnapshot();
  });

  it('should test and take snapshot of booksCollectionPage', () => {
    const tree = render.create(<BooksCollection
      data={ [{ name: 'hello', image: '', id: 1 }] }
      checkBookDetails={ mockFuction }
      heading={ 'hello' }
    />);
    expect(tree).toMatchSnapshot();
  });


  it('should test and take snapshot of booksCategoryPage', () => {
    const tree = render.create(<BooksCategory
      categoryData={ [] }
      data={ [{ name: 'hello', image: '', id: 1 }] }
      checkBookDetails={ mockFuction }
    />);
    expect(tree).toMatchSnapshot();
  });

  it('should test and take snapshot of booksphotoPage', () => {
    const tree = render.create(<BooksPhoto
      data={ [{ name: 'hello', image: '', id: 1 }] }
      checkBookDetails={ mockFuction }
    />);
    expect(tree).toMatchSnapshot();
  });

  it('should test and take snapshot of Side Bar', () => {
    const tree = render.create(<SideBar
      data={ [{ name: 'hello', image: '', id: 1 }] }
      showbooksByCategory={ mockFuction }
    />);
    expect(tree).toMatchSnapshot();
  });

  it('should render the connected component', () => {
    expect(wrapper.find(ConnectedBooksPage).length).toEqual(1);
  });

  it(' checks Prop matches with initialState', () => {
    expect(wrapper.find(BooksPage).prop('data')).toEqual(initialState.books[0].data);
    expect(wrapper.find(BooksPage).prop('isFetched')).toEqual(initialState.books[0].isFetched);
    expect(wrapper.find(BooksPage).prop('categoryData')).toEqual(initialState.category);
    expect(wrapper.find(BooksPage).prop('filteredData')).toEqual(initialState.getFilteredBooks[0].filteredData);
  });

  it('should test for handle change function', () => {
    wrapper = shallow(<BooksFilter
      data={ [{ name: 'hello' }] }
      filteredData={ [{ id: 1, bookTitle: 'love' }] }
      checkBookDetails={ mockFuction }
      searchbooks={ mockFuction }
    />);
    wrapper.instance().handleFuction = mockFuction;
    wrapper.update();
    wrapper.instance().setState({
      filterBy: 'author',
      searchText: 'teh latehj'
    });
    wrapper.update();
    wrapper.instance().handleChange(e);
    wrapper.update();
  });

  it('should test for handle selected function', () => {
    wrapper = shallow(<BooksFilter
      data={ [{ name: 'hello' }] }
      filteredData={ [{ id: 1, bookTitle: 'love' }] }
      checkBookDetails={ mockFuction }
      searchbooks={ mockFuction }
    />);
    wrapper.instance().handleFuction = mockFuction;
    wrapper.update();
    wrapper.instance().handleSelected(e);
    wrapper.update();
    wrapper.instance().setState({ filterBy: 'title' });
    wrapper.update();
  });

  it('should test for functios in book filter', () => {
    wrapper = shallow(<BooksFilter
      data={ [{ name: 'hello' }] }
      filteredData={ [{ id: 1, bookTitle: 'love' }] }
      checkBookDetails={ mockFuction }
      searchbooks={ mockFuction }
    />);
    wrapper.instance().handleFuction = mockFuction;
    wrapper.update();
    wrapper.instance().handleSelected(e);
    wrapper.update();
    wrapper.instance().setState({
      ilterBy: '',
      searchText: '',
      error: '',
      pointer: false
    });
  });

  it('should test and take snapshot of Card box', () => {
    const component = render.create(<Cardbox
      item={{ name: 'hello', image: 'hello', id: 1 }}
      handleClick={ mockFuction }
      checkBookDetails={ mockFuction }
    />);

    expect(component).toMatchSnapshot();
  });

  it('should test for handle click function in sidbar component', () => {
    wrapper = shallow(<SideBar
      data={ [{ name: 'hello', image: '', id: 1 }] }
      showbooksByCategory={ mockFuction }
    />);
    wrapper.instance().handleFuction = mockFuction;
    wrapper.update();
    wrapper.instance().handleClick(e, false);
    wrapper.update();
    wrapper.instance().handleCollapse(e, false);
    wrapper.update();
  });

  it('should test for handle collapse function in sidbar component', () => {
    wrapper = shallow(<SideBar
      data={ [{ name: 'hello', image: '', id: 1 }] }
      showbooksByCategory={ mockFuction }
    />);
    wrapper.instance().handleFuction = mockFuction;
    wrapper.update();
    wrapper.instance().handleCollapse(e, false);
    wrapper.update();
  });

  it('should test for handle click function in cardbox component', () => {
    wrapper = shallow(<Cardbox
      item={{ name: 'hello', image: 'hello', id: 1 }}
      handleClick={ mockFuction }
      checkBookDetails={ mockFuction }
    />);
    wrapper.instance().handleFuction = mockFuction;
    wrapper.update();
    wrapper.instance().handleClick(e, false);
    wrapper.update();
  });

  it('should test for handle click function in BooksCollection component', () => {
    wrapper = shallow(<BooksCollection
      data={ [{ name: 'hello', image: 'l8.jpg', id: 1 }] }
      checkBookDetails={ mockFuction }
      heading={ 'hello' }
    />);
    wrapper.instance().handleFuction = mockFuction;
    wrapper.update();
    wrapper.instance().handleClick(e, false);
    wrapper.update();
  });

  it('should test for componeneWillReceiveProps function in BooksCategory component', () => {
    const nextProps = {
      data: [{ category: books }]
    };

    wrapper = shallow(<BooksCategory
      categoryData={ books[0] }
      data={ [{ name: 'hello', image: '', id: 1 }] }
      checkBookDetails={ mockFuction }
    />);
    wrapper.instance().handleFuction = mockFuction;
    wrapper.update();
    wrapper.instance().componentWillReceiveProps(nextProps);
    wrapper.update();
  });

  it('should test for componeneWillmount function in BooksCategory component', () => {
    const nextProps = {
      data: [{ category: books }]
    };

    wrapper = shallow(<BooksCategory
      categoryData={ books[0] }
      data={ [{ name: 'hello', image: '', id: 1 }] }
      checkBookDetails={ mockFuction }
    />);
    wrapper.instance().handleFuction = mockFuction;
    wrapper.update();
    wrapper.instance().componentWillMount();
    wrapper.update();
  });
});
