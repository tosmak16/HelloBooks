import db from '../models/index';

/** *************************************** */
/* handles find one query for book table */
/** *************************************** */

export const queryBooks = queryObject => db.Books
  .findOne({
    where: queryObject
  });
/** *************************************** */
/* handles find one query for user table */
/** *************************************** */

export const queryUsers = queryObject => db.Users
  .findOne({
    where: queryObject
  });

/** *************************************** */
/* handles different query for book table */
/** *************************************** */

export const queryBorrowedBook = (queryObject, queryType) => {
  switch (queryType) {
    case 'findAll':
      return db.borrowbook.findAll({
        where: queryObject
      });

    default:
      break;
  }
};
/** *************************************** */
/* checks if returned value is a boolean */
/** *************************************** */

export const checkQueryValidity = (returned) => {
  if (returned !== 'false') {
    return 'returned query must be a boolean value';
  }
};
