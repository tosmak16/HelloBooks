import db from '../models/index';

/** *************************************** */
/* handles find one query for book table */
/** *************************************** */
/** 
 * @description handles find one query for book table 
 * @param {object} queryObject 
 * @returns {object } books in json
 */
export const queryBooks = queryObject => db.Books
  .findOne({
    where: queryObject
  });
/** *************************************** */
/* handles find one query for user table */
/** *************************************** */
/**
 * @description handles find one query for user table
 * @param {object} queryObject 
 * @returns {object} users in json
 */
export const queryUsers = queryObject => db.Users
  .findOne({
    where: queryObject
  });

/** *************************************** */
/* handles different query for book table */
/** *************************************** */
/**
 * @description handles different query for book table
 * @param {object} queryObject 
 * @param {string} queryType 
 * @returns {object} borrowedBooks in json
 */
export const queryBorrowedBook = (queryObject, queryType) => {
  switch (queryType) {
    case 'findAll':
      return db.BorrowedBooks.findAll({
        where: queryObject
      });
    default:
      break;
  }
};
/** *************************************** */
/* checks if returned value is a boolean */
/** *************************************** */
/**
 * @description checks if returned value is a boolean 
 * @param {string} returned 
 * @returns {string} message
 */
export const checkQueryValidity = (returned) => {
  if (returned !== 'false') {
    return 'returned query must be a boolean value';
  }
};
