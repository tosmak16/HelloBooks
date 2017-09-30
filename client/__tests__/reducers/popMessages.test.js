import expect from 'expect';
import shortid from 'shortid';

import {
  POP_MESSAGE
} from '../../actions/actionTypes';

import reducer from '../../reducers/popMessages';

const action = {
  message: { type: 'error', text: 'Hello world' }
};

describe('popMessages reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([
      {
        id: 0,
        type: '',
        text: ''
      }
    ]);
  });

  it('should return popMessages state', () => {
    expect(reducer(undefined, {
      type: POP_MESSAGE,
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
