import { COUNTER_ACTION } from '../actions/counter';

const initialState = [{
  count: '',
}];
export default (state = initialState, action) => {
  switch (action.type) {
    case COUNTER_ACTION:
      return [{
        count: action.counter
      }, ...state];
    default: return state;
  }
};
