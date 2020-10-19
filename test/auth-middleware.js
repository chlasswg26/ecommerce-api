const { expect } = require('chai');
const { verifyToken, authorization, verifyRefreshToken } = require('../src/middleware/auth');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsiaWQiOjEsIm5hbWUiOiJJY2hsYXMgV2FyZHkgR3VzdGFtYSIsImVtYWlsIjoiY2FoeW80NzEzQGdtYWlsLmNvbSIsInJvbGUiOiIyIiwiYmFsYW5jZSI6MCwiaW1hZ2UiOm51bGwsImFkZHJlc3MiOm51bGwsInZlcmlmeSI6IjIiLCJzdGF0dXMiOiIyIiwiYWRkZWQiOiIyMDIwLTEwLTEwVDA0OjM4OjUyLjAwMFoiLCJ1cGRhdGVkIjoiMjAyMC0xMC0xMFQwNzozOToxNy4wMDBaIn0sImlhdCI6MTYwMjMxNzgzMywiZXhwIjoxNjAyMzMyMjMzLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAiLCJpc3MiOiJCbGFuamEiLCJzdWIiOiJuby1yZXBseUBibGFuamEuY29tIn0.pl4EE6BSXPILFkqryGkfOt8OafVt7Nde3CJpCs8Ty3k';
const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsiaWQiOjEsIm5hbWUiOiJJY2hsYXMgV2FyZHkgR3VzdGFtYSIsImVtYWlsIjoiY2FoeW80NzEzQGdtYWlsLmNvbSIsInJvbGUiOiIxIiwiYmFsYW5jZSI6MCwiaW1hZ2UiOm51bGwsImFkZHJlc3MiOjAsInZlcmlmeSI6IjIiLCJzdGF0dXMiOiIxIiwiYWRkZWQiOiIyMDIwLTEwLTAxVDA2OjM3OjAyLjAwMFoiLCJ1cGRhdGVkIjoiMjAyMC0xMC0wMVQwNjo0MToyMC4wMDBaIn0sImlhdCI6MTYwMTUzNDg3OCwiZXhwIjoxNjAxNjIxMjc4LCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAiLCJpc3MiOiJTaG9wcGUiLCJzdWIiOiJuby1yZXBseUBzaG9wcGUuY29tIn0.P4wqbDrnHIYtV6D_Vk358pD5cWwHvZ_FdkXJjDSDbVw';

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
      authorization: token
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
      token: null
    }
  };

  expect(verifyRefreshToken.bind(this, request, {}, () => { })).to.throw('jwt must be provided');
});

// eslint-disable-next-line no-undef
it('should throw an error if refresh token is expired', function () {
  const request = {
    body: {
      token: refreshToken
    }
  };

  expect(verifyRefreshToken.bind(this, request, {}, () => { })).to.throw('jwt expired');
});
