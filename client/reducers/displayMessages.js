import shortid from 'shortid';

import { DISPLAY_MESSAGE } from '../actions/actionTypes';


export default (state = [], action = {}) => {
  switch (action.type) {
    case DISPLAY_MESSAGE:
      return [...state, {
        id: shortid,
        type: action.message.type,
        text: action.message.text
      }
      ];
    default: return state;
  }
};

