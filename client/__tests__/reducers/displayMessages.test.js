import expect from 'expect';
import shortid from 'shortid';

import {
  DISPLAY_MESSAGE
} from '../../actions/actionTypes';

import reducer from '../../reducers/displayMessages';

const action = {
  message: { type: 'error', text: 'Hello world' }
};

describe('displayMessages reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([
      {
        id: 0,
        type: '',
        text: ''
      }
    ]);
  });

  it('should return displayMessages state', () => {
    expect(reducer(undefined, {
      type: DISPLAY_MESSAGE,
      message: action.message
    })).toEqual([
      {
        id: shortid,
        type: action.message.type,
        text: action.message.text
      },
      {
        id: 0,
        type: '',
        text: ''
      }
    ]);
  });
});
