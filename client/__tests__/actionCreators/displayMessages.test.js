import expect from 'expect';

import {
  displayMessage,
} from '../../actions/displayMessages';

import {
  DISPLAY_MESSAGE
} from '../../actions/actionTypes';

describe('Test display message action', () => {
  it('should create an action to display message', () => {
    const expectedAction = {
      type: DISPLAY_MESSAGE,
      message: 'Hello World'
    };
    expect(displayMessage('Hello World')).toEqual(expectedAction);
  });
});
