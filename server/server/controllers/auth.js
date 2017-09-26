import jwt from 'jsonwebtoken';


export default {
  auth(req, res, next) {
    const token = req.body.token || req.headers.token;
    if (token) {
      jwt.verify(token, 'encoded', (err, decoded) => {
        if (err) {
          req.decoded = '0';
          return res.status(403).send('Invalid user');
        }
        req.decoded = decoded;
        return next();
      });
    } else {
      res.status(404).send('Token not provided');
    }
  },
};
