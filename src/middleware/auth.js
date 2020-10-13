const jwt = require('jsonwebtoken');
const helper = require('../helper');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  verifyToken: function (request, response, next) {
    const token = request.headers.authorization;
    jwt.verify(token, process.env.SECRET_KEY, helper.signOptions(true), function (error, result) {
      if (
        (error && error.name === 'TokenExpiredError') ||
        (error && error.name === 'JsonWebTokenError')
      ) {
        return helper.response(response, 500, { message: error.message || error });
      } else {
        request.data = {
          ...result
        };
        next();
      }
    });
  },
  authorization: function (request, response, next) {
    const data = request.data.result;
    if (data.role === '1') {
      return helper.response(response, 500, { message: 'Access denied' });
    } else {
      next();
    }
  },
  verifyRefreshToken: function (request, response, next) {
    const token = request.body.token;
    jwt.verify(token, process.env.REFRESH_SECRET_KEY, function (error, result) {
      if (
        (error && error.name === 'TokenExpiredError') ||
        (error && error.name === 'JsonWebTokenError')
      ) {
        return helper.response(response, 500, { message: error.message || error });
      } else {
        request.data = {
          ...result
        };
        next();
      }
    });
  }
};
