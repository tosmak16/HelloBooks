import React from 'react';
import PropTypes from 'prop-types';
import PDFReader from 'react-pdf-reader';


class PdfReader extends React.Component {
  render() {
    return (
      <div className="container" style={{ width: '100px' }}>
        <div id="pdf_chip" className="button red-text">
          <button onClick={ this.props.onHandleClose } className="close material-icons">close</button>
        </div>
        <PDFReader

          file={ this.props.pdfUrl }
          renderType="canvas"
        />
      </div>


    );
  }
}

PdfReader.propTypes = {
  onHandleClose: PropTypes.func.isRequired,
  pdfUrl: PropTypes.string.isRequired,

};

export default PdfReader;
