import shortid from 'shortid';

import { TOAST_MESSAGE } from '../actions/actionTypes';


export default (state = [], action = {}) => {
  switch (action.type) {
    case TOAST_MESSAGE:
      return [...state, {
        id: shortid,
        type: action.message.type,
        text: action.message.text
      }
      ];
    default: return state;
  }
};

