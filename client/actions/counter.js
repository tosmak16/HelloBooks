export const COUNTER_ACTION = 'COUNTER_ACTION';

/**
 * 
 * 
 * @export
 * @param {any} counter 
 * @returns 
 */
export function countCheckedBooks(counter) {
  return {
    type: COUNTER_ACTION,
    counter
  };
}
