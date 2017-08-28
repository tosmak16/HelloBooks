import shortid from 'shortid';

import { ADD_FLASH_MESSAGE } from '../actions/actionTypes';


export default (state = [], action = {}) => {
  switch (action.type) {
    case ADD_FLASH_MESSAGE:
      return [...state, {
        id: shortid,
        type: action.message.type,
        text: action.message.text
      }
      ];
    default: return state;
  }
};

