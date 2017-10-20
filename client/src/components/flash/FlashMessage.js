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
    const { text } = this.props.message;
    Materialize.toast(text, 2000, 'rounded');
    return (
      <div />
    );
  }
}


FlashMessage.propTypes = {
  message: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default FlashMessage;
