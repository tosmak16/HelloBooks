import { ADD_FLASH_MESSAGE } from './actionTypes';

export function addFlashMessage(message) {
  return {
    type: ADD_FLASH_MESSAGE,
    message
  };
}
