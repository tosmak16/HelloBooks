import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import FlashMessage from './FlashMessage';


let messages = '';
let message = '';
let pointer = true;
/**
 * 
 * 
 * @class FlashMessagesList
 * @extends {React.Component}
 */
class FlashMessagesList extends React.Component {
  /**
   * 
   * 
   * @memberof FlashMessagesList
   */
  componentWillMount() {
    if (!isEmpty(this.props.message.text)) {
      message = <FlashMessage key={ this.props.message.id } message={ this.props.message } />;
      pointer = true;
    }
    if (!isEmpty(this.props.messages.text)) {
      messages = <FlashMessage key={ this.props.messages.id } message={ this.props.messages } />;
      pointer = false;
    }
  }

  /**
   * 
   * 
   * @returns 
   * @memberof FlashMessagesList
   */
  render() {
    return (
      <div>
        <div>{!pointer && messages}</div>
        <div>{pointer && message}</div>
      </div>
    );
  }
}


FlashMessagesList.propTypes = {
  message: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,

};

/**
 * 
 * 
 * @param {any} state 
 * @returns 
 */
function mapStateToProps(state) {
  return {
    messages: state.popMessages[0],
    message: state.displayMessages[0]
  };
}


export default connect(mapStateToProps)(FlashMessagesList);
