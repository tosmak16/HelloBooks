import React from 'react';
import isEmpty from 'lodash/isEmpty';
import filterBy from 'lodash/filter';
import PropTypes from 'prop-types';
import $ from 'jquery';


import BbTableRow from './BbTableRow';
import DoubleActionModal from '../modal/DoubleActionModal';
import SingleActionModal from '../modal/SingleActionModal';
import PdfReader from '../pdf/PdfReader';


let tablerow = '';
let co = '';

let sortedData = '';
class BorrowedbooksTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: '',
      bookId: '',
      error: '',
      pointer: false,
      errors: '',
      message: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleYes = this.handleYes.bind(this);
    this.handleNo = this.handleNo.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.handleRead = this.handleRead.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillMount() {
    if (isEmpty(this.props.data)) {
      this.props.getunreturnedBooks(localStorage.jwtToken);
    }

    if (isEmpty(this.props.bookData)) {
      this.props.getbooks(true);
    }

    $(document).ready(() => {
      // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
      $('.modal').modal();
    });
  }
  componentWillReceiveProps(nextProps) {
    sortedData = nextProps.item[0];

    if (this.state.pointer) {
      if (!isEmpty(sortedData.error) && this.state.pointer) {
        $('#modal2').modal('open');
        this.setState({
          pointer: false,
          errors: sortedData.error,
        });
      } else if (!isEmpty(sortedData.response) && this.state.pointer) {
        $('#modal3').modal('open');
        this.setState({
          pointer: false,
          message: sortedData.response,
        });
      }
    }
    if (nextProps.isRefreshed) {
      this.props.refreshPage(false);
      this.props.getunreturnedBooks(localStorage.jwtToken);
      this.props.getborrowedBooks(localStorage.jwtToken);
    }
  }
  handleClick(e) {
    co = e.target.name;
    const Id = co.slice(0, co.search(','));
    const bookId = co.slice(-1);
    this.setState({
      bookId,
      Id
    });
    $('#modal1').modal('open');
  }

  handleExit(e) {
    e.preventDefault();

    $('#modal2').modal('close');
    $('#modal3').modal('close');


    this.props.refreshPage(true);
  }

  handleYes(e) {
    e.preventDefault();
    this.props.returnbook(this.state, localStorage.jwtToken);
    this.setState({
      pointer: true,
    });
    $('#modal1').modal('close');
  }
  handleNo(e) {
    e.preventDefault();
    $('#modal1').modal('close');
  }

  handleRead(e) {
    e.preventDefault();
    $('#pdf_reader').show();
    $('#bh_table').hide();
    $('#b_page').hide();
    $('#ch_pas').hide();
  }

  handleClose(e) {
    e.preventDefault();
    $('#pdf_reader').hide();
  }
  render() {
    if (this.props.data) {
      const { data } = this.props;
      tablerow = data.map(row =>
        (<BbTableRow
          key={ row.id }
          row={ row }
          value={ row.id }
          bookItem={ filterBy(this.props.bookData, ['id', row.bookId]) }
          onHandleClick={ this.handleClick }
          onHandleRead={ this.handleRead }
        />)
      );
    }
    return (
      <div id="bb_table" className="row">
        <div id="pdf_reader" >
          <PdfReader onHandleClose={ this.handleClose } pdfUrl={ 'http://res.cloudinary.com/tosmak/image/upload/v1507609165/Hello-Books_-_Google_Docs_je9tyz.pdf' } />
        </div>
        <div className="  col l10 offset-l2 col m10 offset-m2 col s12">
          <h4 className="sub-header"> Currently Reads</h4>

          <div className="responsive-table">
            <table className="table responsive-table bordered highlight striped">
              <thead>
                <tr>
                  <th><span className="glyphicon glyphicon-education" /></th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>ISBN</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tablerow}
              </tbody>
            </table>
          </div>


          <SingleActionModal
            id={ 'modal3' } heading={ 'Done!' }
            message={ this.state.message ? this.state.message : '' }
            onHandleExit={ this.handleExit }
          />
          <SingleActionModal
            id={ 'modal2' } heading={ 'Oh!' }
            message={ this.state.errors ? this.state.errors : '' }
            onHandleExit={ this.handleExit }
          />


          <DoubleActionModal
            id={ 'modal1' }
            onHandleClick={ this.handleYes }
            onHandleClose={ this.handleNo }
            bookTitle={ '' }
            heading={ 'Do you want to return this book?' }
          />
        </div>
      </div>
    );
  }
}

BorrowedbooksTable.propTypes = {
  bookData: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  getbooks: PropTypes.func.isRequired,
  getborrowedBooks: PropTypes.func.isRequired,
  getunreturnedBooks: PropTypes.func.isRequired,
  isRefreshed: PropTypes.bool.isRequired,
  item: PropTypes.array.isRequired,
  refreshPage: PropTypes.func.isRequired,
  returnbook: PropTypes.func.isRequired,
};


export default BorrowedbooksTable;
