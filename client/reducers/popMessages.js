import shortid from 'shortid';

import { POP_MESSAGE } from '../actions/actionTypes';


const initialState = [{
  id: 0,
  type: '',
  text: ''

}];

export default (state = initialState, action) => {
  switch (action.type) {
    case POP_MESSAGE:
      return [{
        id: shortid,
        type: action.message.type,
        text: action.message.text
      }, ...state
      ];
    default: return state;
  }
};

