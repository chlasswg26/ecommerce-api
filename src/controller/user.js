const helper = require('../helper');
const User = require('../model/user');

module.exports = {
  getUser: async function (_request, response) {
    try {
      const result = await User.findAll({
        attributes: {
          exclude: ['password', 'verify_code']
        }
      });

      return helper.response(response, 200, result);
    } catch (error) {
      return helper.response(response, 500, { message: error.message });
    }
  },
  getUserById: async function (request, response) {
    try {
      const idUser = request.params.id || null;
      const result = await User.findByPk(idUser, {
        attributes: {
          exclude: ['password', 'verify_code']
        }
      });

      if (!result) return helper.response(response, 400, { message: 'Bad parameter' });

      return helper.response(response, 200, result);
    } catch (error) {
      return helper.response(response, 500, { message: error.message });
    }
  },
  getUserByAddress: async function (request, response) {
    try {
      const idAddress = request.params.id || null;

      const result = await User.findOne({
        where: {
          address: idAddress
        },
        attributes: {
          exclude: ['password', 'verify_code']
        }
      });

      if (!result) return helper.response(response, 400, { message: 'Bad parameter' });

      return helper.response(response, 200, result);
    } catch (error) {
      return helper.response(response, 500, { message: error.message });
    }
  },
  postUser: async function (request, response) {
    try {
      const setData = request.body;
      setData.verify = '2';
      const file = request.file;

      if (file) setData.image = file.filename;

      const result = await User.create(setData, {
        validate: true
      });

      delete result.dataValues.password;
      delete result.dataValues.verify_code;
      return helper.response(response, 200, result);
    } catch (error) {
      return helper.response(response, 500, { message: error.message });
    }
  },
  putUser: async function (request, response) {
    try {
      const newData = request.body;
      const idUser = request.params.id || null;
      const file = request.file;

      if (file) newData.image = file.filename;

      const result = await User.update(newData, {
        where: {
          id: idUser
        }
      });

      if (result >= 1) {
        if (newData.password) delete newData.password;

        return helper.response(response, 200, newData);
      }

      return helper.response(response, 400, { message: 'Data is not affected' });
    } catch (error) {
      return helper.response(response, 500, { message: error.message });
    }
  },
  deleteUser: async function (request, response) {
    try {
      const idUser = request.params.id || null;
      const result = await User.destroy({
        where: {
          id: idUser
        }
      });

      if (result >= 1) return helper.response(response, 200, { message: 'Data has been deleted' });

      return helper.response(response, 400, { message: 'Data is not affected' });
    } catch (error) {
      return helper.response(response, 500, { message: error.message });
    }
  }
};
