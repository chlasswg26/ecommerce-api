const jwt = require('jsonwebtoken');
const helper = require('../helper');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  authentication: function (request, response, next) {
    const token = request.headers.authorization;
    jwt.verify(token, process.env.SECRET_KEY, function (error, result) {
      if (
        (error && error.name === 'TokenExpiredError') ||
        (error && error.name === 'JsonWebTokenError')
      ) {
        return helper.response(response, 401, { message: error.name });
      } else {
        request.token = result;
        next();
      }
    });
  },
  authorization: function (request, response, next) {
    const token = request.headers.authorization;
    jwt.verify(token, process.env.SECRET_KEY, function (_, result) {
      const role = request.token.result.role;
      if (role === '1') {
        return helper.response(response, 401, { message: 'You don\'t have access' });
      } else {
        request.token = result;
        next();
      }
    });
  },
  authRefreshToken: function (request, response, next) {
    const token = request.body.token;
    jwt.verify(token, process.env.REFRESH_SECRET_KEY, function (error, result) {
      if (
        (error && error.name === 'TokenExpiredError') ||
        (error && error.name === 'JsonWebTokenError')
      ) {
        return helper.response(response, 401, { message: error.name });
      } else {
        request.token = result;
        next();
      }
    });
  }
};
