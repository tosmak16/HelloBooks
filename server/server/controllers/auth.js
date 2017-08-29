import jwt from 'jsonwebtoken';

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
          req.decoded = '0';
          return res.status(401).send('failed to authemticate');
        }
        req.decoded = decoded;
        return next();
      });
    } else {
      res.status(403).send('Token not provided');
    }
  },
};
