import { TOAST_MESSAGE } from './actionTypes';

export function toastMessage(message) {
  return {
    type: TOAST_MESSAGE,
    message
  };
}
