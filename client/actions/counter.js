export const COUNTER_ACTION = 'COUNTER_ACTION';


export function countCheckedBooks(counter) {
  return {
    type: COUNTER_ACTION,
    counter
  };
}
