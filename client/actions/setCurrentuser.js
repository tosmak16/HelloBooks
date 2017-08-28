import { SET_USER } from './actionTypes';

export function setCurrentuser(user) {
  return {
    type: SET_USER,
    user
  }
}
