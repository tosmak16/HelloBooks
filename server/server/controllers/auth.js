import jwt from 'jsonwebtoken';
import User from '../models/users';
import db from '../models/index';

/**
* @method auth
* @desc This is a methodwhich performs the fuction of a middle ware to ensure secure authentication
* @param { object } req
* @param { object} res
* @returns { object } response
*/
export default {
  auth(req, res, next) {
    const token = req.body.token || req.headers.token;
    if (token) {
      jwt.verify(token, 'encoded', (err, decoded) => {
        if (err) {
          console.error('JWT Verification Error');
          req.decoded = '0';
          return res.status(403).send(err);
        }
        req.decoded = decoded;
        return next();
      });
    } else {
      res.status(404).send('Token not provided');
    }
  },
};
