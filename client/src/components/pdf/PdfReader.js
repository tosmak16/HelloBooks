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
  /**
   * 
   * 
   * @returns 
   * @memberof PdfReader
   * @description displays the document loaded
   */
  render() {
    return (
      <div className="container" style={{ width: '100px' }}>
        <div id="pdf_chip" className="button red-text">
          <button
            onClick={this.props.onHandleClose}
            className="close material-icons"
          >close</button>
        </div>
        <Document
          file={this.props.pdfUrl}
          onLoadSuccess={this.handleDocumentLoad}
        >
          <Page pageNumber={this.state.pageNumber} />
        </Document>
        <div id="pdf_chip" className="button red-text">
          <button onClick={this.handleNext} className="close material-icons">close</button>
        </div>
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

