import { POP_MESSAGE } from './actionTypes';
/**
 * 
 * 
 * @export
 * @param {any} message 
 * @returns 
 */
export function popMessage(message) {
  return {
    type: POP_MESSAGE,
    message
  };
}
