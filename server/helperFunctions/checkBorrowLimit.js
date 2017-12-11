import db from '../models/index';
/** *************************************** */
/* it checks if a user has exceed his borrowing limit */
/* it's an async function which returns a promise */
/** *************************************** */

export const checkBorrowLimit = async (queryObject,
  queryFilterArray,
  numberOfBorrowedBooks
) => {
  let response = {};
  await db.Users
    .findOne({
      attributes: queryFilterArray,
      where: queryObject
    }).then((userMembershipType) => {
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
    }).catch((errorMessage) => {
      response = {
        status: 400,
        message: errorMessage.errors[0].message.toString()
      };
    });
  return response;
};
export default checkBorrowLimit;
