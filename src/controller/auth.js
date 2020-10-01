const helper = require('../helper');
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  postRegister: async function (request, response) {
    try {
      const setData = request.body;
      const file = request.file;

      if (file) setData.image = file.filename;

      const checkUser = await User.findOne({
        where: {
          email: setData.email
        }
      });
      const randomCode = helper.random(6);
      const verifyCode = bcrypt.hashSync(randomCode, 10);
      const hashedPassword = bcrypt.hashSync(setData.password, 18);

      if (checkUser) return helper.response(response, 400, { message: 'Account has been registered' });
      if (hashedPassword) setData.password = hashedPassword;
      if (verifyCode) setData.verify_code = verifyCode;

      const emailTemplate = `
            <center>
                <h2>Your account must be verification</h2>
                <hr>
                OTP Code : <h4>${randomCode}</h4>
                <br />
                <h3>This code valid for 24 Hours</h3>
            </center>
        `;

      await helper.nodemailer(
        setData.email,
        `OTP Verification Code | ${process.env.SITE_NAME}`,
        emailTemplate
      )
        .then(async (preview) => {
          const result = await User.create(setData, {
            validate: true
          });
          result.dataValues.preview = preview;

          delete result.dataValues.password;
          delete result.dataValues.verify_code;

          return helper.response(response, 200, result);
        });
    } catch (error) {
      return helper.response(response, 500, { message: error.message });
    }
  },
  postLogin: async function (request, response) {
    try {
      const setData = request.body;
      const password = setData.password;
      const checkUser = await User.findOne({
        where: {
          email: setData.email
        }
      });

      if (!checkUser) return helper.response(response, 400, { message: 'Unregistered account' });

      const comparePassword = bcrypt.compareSync(password, checkUser.password);

      if (!comparePassword) return helper.response(response, 400, { message: 'Incorrect password' });
      if (checkUser.verify === '1') return helper.response(response, 400, { message: 'Unverified account' });

      delete checkUser.dataValues.password;
      delete checkUser.dataValues.verify_code;

      const getDataValues = checkUser.dataValues;
      const accessToken = jwt.sign(
        {
          result: getDataValues
        },
        process.env.SECRET_KEY,
        helper.signOptions(process.env.TOKEN_LIFE)
      );
      const refreshToken = jwt.sign(
        {
          result: getDataValues
        },
        process.env.REFRESH_SECRET_KEY,
        helper.signOptions(process.env.REFRESH_TOKEN_LIFE)
      );
      const newData = {
        ...getDataValues,
        accessToken,
        refreshToken
      };

      return helper.response(response, 200, newData);
    } catch (error) {
      return helper.response(response, 500, { message: error.message });
    }
  },
  putVerify: async function (request, response) {
    try {
      const setData = request.body;
      const otpCode = setData.otp_code;
      const checkUser = await User.findOne({
        where: {
          email: setData.email
        }
      });

      if (!checkUser) return helper.response(response, 400, { message: 'Unregistered account' });
      if (checkUser.verify === '2') return helper.response(response, 400, { message: 'Account has been verified' });

      const verifyCode = checkUser.verify_code;
      const compareCode = bcrypt.compareSync(otpCode, verifyCode);

      if (!compareCode) return helper.response(response, 400, { message: 'Invalid OTP Code' });

      const result = await User.update({
        verify: '2',
        verify_code: null
      }, {
        where: {
          email: checkUser.email
        }
      });

      if (result >= 1) {
        return helper.response(response, 200, { message: 'Verified account' });
      }

      return helper.response(response, 400, { message: 'Verification failed' });
    } catch (error) {
      return helper.response(response, 500, { message: error.message });
    }
  },
  postRefreshToken: async function (request, response) {
    const data = request.data;

    if (!data) return helper.response(response, 400, { message: 'Failed for refresh token' });

    const accessToken = jwt.sign(
      {
        result: {
          ...data.result
        }
      },
      process.env.SECRET_KEY,
      helper.signOptions(process.env.TOKEN_LIFE)
    );
    const refreshToken = jwt.sign(
      {
        result: {
          ...data.result
        }
      },
      process.env.REFRESH_SECRET_KEY,
      helper.signOptions(process.env.REFRESH_TOKEN_LIFE)
    );

    return helper.response(response, 200, {
      ...data.result,
      accessToken,
      refreshToken
    });
  }
};
