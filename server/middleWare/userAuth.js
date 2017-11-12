export default {
  /**
   * auth method serves  as middleware for user authentication only
   * it verifies token.
   * @function auth
   * @param {any} req
   * @param {any} res
   * @param {any} next
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
