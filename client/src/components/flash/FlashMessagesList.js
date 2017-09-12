import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import FlashMessage from './FlashMessage';


let messages = '';
let message = '';
let pointer = true;
class FlashMessagesList extends React.Component {
  componentWillMount() {
    if (!isEmpty(this.props.message)) {
      message = this.props.message.map(mes =>
        <FlashMessage key={ mes.id } message={ mes } />);
      pointer = true;
    }
    if (!isEmpty(this.props.messages)) {
      messages = this.props.messages.map(message =>
        <FlashMessage key={ message.id } message={ message } />);
      pointer = false;
    }
  }


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
  message: PropTypes.array.isRequired,
  messages: PropTypes.array.isRequired,

};

function mapStateToProps(state) {
  return {
    messages: state.popMessages,
    message: state.displayMessages
  };
}


export default connect(mapStateToProps)(FlashMessagesList);
