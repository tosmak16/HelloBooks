import jwt from 'jsonwebtoken';

export default {
  /**
   * @description auth method serves  as middleware for authentication
   * it verifies token.
   * 
   * @function auth
   * 
   * @param {object} req HTTP request
   * 
   * @param {object} res HTTP response
   * 
   * @param {function} next
   * 
   * @returns { object } response messahe object
   */
  auth(req, res, next) {
    const token = req.body.token || req.headers.token;
    if (token) {
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
          req.decoded = '0';
          return res.status(401).send({
            status: 401,
            message: 'Invalid user'
          });
        }
        req.decoded = decoded;
        return next();
      });
    } else {
      res.status(404).send({
        status: 404,
        message: 'Token not provided'
      });
    }
  },
};
