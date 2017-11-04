import { TOAST_MESSAGE } from './actionTypes';

/**
 * 
 * 
 * @export
 * @param {any} message 
 * @returns 
 */
export function toastMessage(message) {
  return {
    type: TOAST_MESSAGE,
    message
  };
}
