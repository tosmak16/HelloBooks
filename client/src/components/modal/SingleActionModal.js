import React from 'react';
import PropTypes from 'prop-types';

class SingleActionModal extends React.Component {
  render() {
    return (
      <div id={ this.props.id } className="modal">
        <div className="modal-content">
          <h5>{this.props.heading}</h5>
          <p>{this.props.message}</p>
        </div>
        <div className="modal-footer">
          <a href="" onClick={ this.props.onHandleExit } className="modal-action modal-close waves-effect waves-brown btn-flat">Close</a>
        </div>
      </div>
    );
  }
}


SingleActionModal.propTypes = {
  heading: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onHandleExit: PropTypes.func.isRequired,


};
export default SingleActionModal;
