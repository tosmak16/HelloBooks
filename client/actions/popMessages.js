import { POP_MESSAGE } from './actionTypes';

export function popMessage(message) {
  return {
    type: POP_MESSAGE,
    message
  };
}
