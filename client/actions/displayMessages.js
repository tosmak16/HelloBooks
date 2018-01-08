import { DISPLAY_MESSAGE } from './actionTypes';
/**
 * @param {string} message 
 * 
 * @returns {object} of display message state
 */
export const displayMessage = (message) => {
  return {
    type: DISPLAY_MESSAGE,
    message
  };
}
