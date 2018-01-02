import db from '../models/index';
/** *************************************** */
/* it checks if a user has exceed his borrowing limit */
/* it's an async function which returns a promise */
/** *************************************** */
/**
 * @description it checks if a user has exceed his borrowing limit
 * @param {object} queryObject 
 * @param {arrray} queryFilterArray 
 * @param {string} numberOfBorrowedBooks 
 * @returns {object} response
 */
export const checkBorrowLimit = async (queryObject, queryFilterArray, numberOfBorrowedBooks) => {
  let response = {};
  const userMembershipType = await db.Users
    .findOne({ attributes: queryFilterArray, where: queryObject });
  const { membershipType } = userMembershipType;
  if (membershipType === 'Basic' && numberOfBorrowedBooks >= 1) {
    response = {
      status: 403,
      message: `Sorry you can not borrow more than ${numberOfBorrowedBooks} books`
    };
  } else if (membershipType === 'Silver' && numberOfBorrowedBooks >= 4) {
    response = {
      status: 403,
      message: `Sorry you can not borrow more than ${numberOfBorrowedBooks} books`
    };
  } else if (membershipType === 'Gold' && numberOfBorrowedBooks >= 7) {
    response = {
      status: 403,
      message: `Sorry you can not borrow more than ${numberOfBorrowedBooks} books`
    };
  }
  return response;
};
export default checkBorrowLimit;
