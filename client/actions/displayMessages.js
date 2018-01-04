import { DISPLAY_MESSAGE } from './actionTypes';
/**
 * @param {string} message 
 * @returns 
 */
export const displayMessage = (message) => {
  return {
    type: DISPLAY_MESSAGE,
    message
  };
}
