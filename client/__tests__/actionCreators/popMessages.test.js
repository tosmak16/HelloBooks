import expect from 'expect';


import {
  popMessage,
} from '../../actions/popMessages';

import {
  POP_MESSAGE
} from '../../actions/actionTypes';


describe('Test Pop message action', () => {
  it('should create an action to pop message', () => {
    const expectedAction = {
      type: POP_MESSAGE,
      message: 'Hello World'
    };
    expect(popMessage('Hello World')).toEqual(expectedAction);
  });
});
