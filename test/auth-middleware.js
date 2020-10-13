const { expect } = require('chai');
const { verifyToken, authorization, verifyRefreshToken } = require('../src/middleware/auth');

// eslint-disable-next-line no-undef
it('should throw an error if no authorization header is present', function () {
  const request = {
    headers: {
      authorization: null
    }
  };

  expect(verifyToken.bind(this, request, {}, () => { })).to.throw('jwt must be provided');
});

// eslint-disable-next-line no-undef
it('should throw an error if the token is expired', function () {
  const request = {
    headers: {
      authorization: null
    }
  };

  expect(verifyToken.bind(this, request, {}, () => { })).to.throw('jwt expired');
});

// eslint-disable-next-line no-undef
it('should throw an error if authorization is no admin', function () {
  const request = {
    data: {
      role: '1'
    }
  };

  expect(authorization.bind(this, request, {}, () => { })).to.throw('Access denied');
});

// eslint-disable-next-line no-undef
it('should throw an error if no refresh token is present', function () {
  const request = {
    body: {
      authorization: null
    }
  };

  expect(verifyRefreshToken.bind(this, request, {}, () => { })).to.throw('jwt must be provided');
});

// eslint-disable-next-line no-undef
it('should throw an error if refresh token is expired', function () {
  const request = {
    body: {
      authorization: null
    }
  };

  expect(verifyRefreshToken.bind(this, request, {}, () => { })).to.throw('jwt expired');
});
