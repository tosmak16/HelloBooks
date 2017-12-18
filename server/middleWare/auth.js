import jwt from 'jsonwebtoken';


export default {
  /**
   * auth method serves  as middleware for authentication
   * it verifies token.
   * @function auth
   * @param {any} req
   * @param {any} res
   * @param {any} next
   */

  auth(req, res, next) {
    const token = req.body.token || req.headers.token;
    if (token) {
      jwt.verify(token, 'encoded', (err, decoded) => {
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