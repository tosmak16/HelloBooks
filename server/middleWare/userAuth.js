export default {
  /**
   * @description auth method serves  as middleware for user authentication only
   * it verifies token.
   * 
   * @function userAuth
   * 
   * @param {object} req HTTP request
   * 
   * @param {object} res HTTP response
   * 
   * @param {function} next
   * 
   * @returns { object } response object
   */
  userAuth(req, res, next) {
    if (req.params.userId.toString() !== req.decoded.id.toString()) {
      return res.status(401).send({
        status: 401,
        message: 'Invalid Identity'
      });
    }
    return next();
  }
};
