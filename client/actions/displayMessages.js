import { DISPLAY_MESSAGE } from './actionTypes';

export function displayMessage(message) {
  return {
    type: DISPLAY_MESSAGE,
    message
  };
}
