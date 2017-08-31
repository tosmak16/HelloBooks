import shortid from 'shortid';

import { POP_MESSAGE } from '../actions/actionTypes';


export default (state = [], action = {}) => {
  switch (action.type) {
    case POP_MESSAGE:
      return [...state, {
        id: shortid,
        type: action.message.type,
        text: action.message.text
      }
      ];
    default: return state;
  }
};

