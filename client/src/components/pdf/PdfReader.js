import PropTypes from 'prop-types';


import React, { Component } from 'react';
import { Document, Page } from 'react-pdf/build/entry.noworker';

let i = 0;
/**
 * 
 * 
 * @class PdfReader
 * @extends {Component}
 */
class PdfReader extends Component {
  /**
   * 
   * @param {any} props '
   * @description Creates an instance of PdfReader.
   * @memberof PdfReader
   */
  constructor(props) {
    super(props);

    this.state = {
      numPages: null,
      pageNumber: 1,
    };
    this.handleDocumentLoad = this.handleDocumentLoad.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
  }
  /**
   * 
   *
   * @description this method handles loading of document
   * @memberof PdfReader
   * @method handleDocumentLoad
   * 
   */
  handleDocumentLoad({ numPages }) {
    this.setState({ numPages });
  }
  /**
   * 
   * @method handleNext
   * @memberof PdfReader
   * @description this method helps to navigate from one page to another
   */
  handleNext() {
    if (this.state.numPages > i) {
      this.setState({
        pageNumber: i += 1,
      });
    } else {
      console.log('ended');
    }
  }

  handlePrev() {
    if (i > 1) {
      this.setState({
        pageNumber: i -= 1,
      });
    } else {
      console.log('ended');
    }
  }
  /**
   * 
   * 
   * @returns 
   * @memberof PdfReader
   * @description displays the document loaded
   */
  render() {
    return (
      <div className="container pdf_con" style={{ width: '100px' }}>
        <div style={{ marginLeft: '20px' }} className="button pdf_chip red-text">
          <button
            onClick={this.props.onHandleClose}
            className="close material-icons"
          >close</button>
        </div>
        <div style={{ marginLeft: '20px', marginTop: '350px' }} className="button pdf_chip green-text">
          <button onClick={this.handlePrev} className="keyboard_arrow_left material-icons">keyboard_arrow_left</button>
        </div>
        <div style={{ marginLeft: '550px', marginTop: '350px' }} className="button pdf_chip green-text">
          <button onClick={this.handleNext} className="keyboard_arrow_right next material-icons">keyboard_arrow_right</button>
        </div>
        <Document
          file={this.props.pdfUrl}
          onLoadSuccess={this.handleDocumentLoad}
        >
          <Page pageNumber={this.state.pageNumber} />
        </Document>
        <p>Page {this.state.pageNumber} of {this.state.numPages}</p>
      </div>
    );
  }
}


PdfReader.propTypes = {
  onHandleClose: PropTypes.func.isRequired,
  pdfUrl: PropTypes.string.isRequired,

};

export default PdfReader;

