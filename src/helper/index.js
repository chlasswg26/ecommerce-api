'use strict';
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  response: function (response, status, data, pagination) {
    const result = {};
    result.status = status || 200;
    result.data = data;
    if (pagination !== null) result.pagination = pagination;
    return response.status(result.status).json(result);
  },
  random: function (length) {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },
  nodemailer: async function (email, subject, template) {
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
    const info = await transporter.sendMail({
      from: process.env.SERVICE_EMAIL,
      to: email,
      subject: subject,
      html: template
    });
    const previewUrl = nodemailer.getTestMessageUrl(info);
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', previewUrl);

    return previewUrl;
  },
  redis: function (object) {
    return Object.keys(object)
      .map((key) => key + object[key])
      .join('');
  },
  signOptions: function (expires) {
    const signOptions = {
      issuer: process.env.SITE_NAME,
      subject: process.env.SERVICE_EMAIL,
      audience: 'http://localhost:5000',
      expiresIn: expires
    };
    return signOptions;
  }
};
