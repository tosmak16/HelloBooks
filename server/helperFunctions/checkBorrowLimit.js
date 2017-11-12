import db from '../models/index';
/** *************************************** */
/* it checks if a user has exceed his borrowing limit */
/* it's an async function which returns a promise */
/** *************************************** */

export const checkBorrowLimit = async (queryObject,
  queryFilterArray,
  numberOfBorrowedBooks
) => {
  let hasExceededBorrowingLimit = false;
  await db.Users
    .findOne({
      attributes: queryFilterArray,
      where: queryObject
    }).then((userMembershipType) => {
      const {
        membershipType
      } = userMembershipType;
      if (membershipType === 'Basic') {
        if (numberOfBorrowedBooks >= 1) {
          hasExceededBorrowingLimit = true;
          return hasExceededBorrowingLimit;
        }
        hasExceededBorrowingLimit = false;
        return hasExceededBorrowingLimit;
      } else if (membershipType === 'Silver') {
        if (numberOfBorrowedBooks >= 4) {
          hasExceededBorrowingLimit = true;
          return hasExceededBorrowingLimit;
        }
        hasExceededBorrowingLimit = false;
        return hasExceededBorrowingLimit;
      } else if (membershipType === 'Gold') {
        if (numberOfBorrowedBooks >= 7) {
          hasExceededBorrowingLimit = true;
          return hasExceededBorrowingLimit;
        }
        hasExceededBorrowingLimit = false;
        return hasExceededBorrowingLimit;
      }
    }).catch((errorMessage) => {
      hasExceededBorrowingLimit = errorMessage.errors[0].message.toString();
      return hasExceededBorrowingLimit;
    });

  return hasExceededBorrowingLimit;
};


export default checkBorrowLimit;
