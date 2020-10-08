const bcrypt = require('bcrypt');
const helper = require('../helper');
const Address = require('../model/address');
const User = require('../model/user');
const modelOptions = {
  include: [
    {
      model: Address
    },
    {
      model: Address,
      as: 'active_address'
    }
  ],
  attributes: {
    exclude: [
      'address',
      'password',
      'verify_code'
    ]
  }
};

module.exports = {
  getUser: async function (_request, response) {
    try {
      const result = await User.findAll(modelOptions);

      return helper.response(response, 200, result);
    } catch (error) {
      return helper.response(response, 500, { message: error.message });
    }
  },
  getUserById: async function (request, response) {
    try {
      const idUser = request.params.id || null;
      const result = await User.findByPk(idUser, modelOptions);

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
        ...modelOptions
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
      const hashedPassword = bcrypt.hashSync(setData.password, 18);

      if (file) setData.image = file.filename;
      if (hashedPassword) setData.password = hashedPassword;

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

      if (newData.password) {
        const hashedPassword = bcrypt.hashSync(newData.password, 18);
        newData.password = hashedPassword;
      }
      if (file) newData.image = file.filename;

      const result = await User.update(newData, {
        where: {
          id: idUser
        }
      });

      if (result >= 1) {
        if (newData.password) delete newData.password;

        return helper.response(response, 200, { message: 'Data is updated' });
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
