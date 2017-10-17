import { DISPLAY_MESSAGE } from './actionTypes';
/**
 * 
 * 
 * @export
 * @param {any} message 
 * @returns 
 */
export function displayMessage(message) {
  return {
    type: DISPLAY_MESSAGE,
    message
  };
}
