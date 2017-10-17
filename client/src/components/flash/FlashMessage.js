import React from 'react';
import PropTypes from 'prop-types';


/**
 * 
 * 
 * @class FlashMessage
 * @extends {React.Component}
 */
class FlashMessage extends React.Component {
  /**
   * 
   * 
   * @returns 
   * @memberof FlashMessage
   */
  render() {
    const { id, type, text } = this.props.message;
    Materialize.toast(text, 2000, 'rounded');
    return (
      <div />
    );
  }
}


FlashMessage.propTypes = {
  message: PropTypes.object.isRequired
};

export default FlashMessage;
