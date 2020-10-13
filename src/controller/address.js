const helper = require('../helper');
const Address = require('../model/address');
const User = require('../model/user');
const modelOptions = {
  include: [
    {
      model: User,
      as: 'active_user',
      attributes: {
        exclude: [
          'password',
          'verify_code'
        ]
      }
    }
  ],
  attributes: {
    exclude: [
      'user'
    ]
  }
};

module.exports = {
  getAddress: async function (_request, response) {
    try {
      const result = await Address.findAll(modelOptions);

      return helper.response(response, 200, result);
    } catch (error) {
      return helper.response(response, 500, { message: error.message || error });
    }
  },
  getAddressById: async function (request, response) {
    try {
      const idAddress = request.params.id || null;
      const result = await Address.findByPk(idAddress, modelOptions);

      if (!result) return helper.response(response, 400, { message: 'Bad parameter' });

      return helper.response(response, 200, result);
    } catch (error) {
      return helper.response(response, 500, { message: error.message || error });
    }
  },
  getAddressByUser: async function (request, response) {
    try {
      const idUser = request.params.id || null;
      const result = await Address.findAll({
        where: {
          user: idUser
        },
        ...modelOptions
      });

      if (!result) return helper.response(response, 400, { message: 'Bad parameter' });

      return helper.response(response, 200, result);
    } catch (error) {
      return helper.response(response, 500, { message: error.message || error });
    }
  },
  postAddress: async function (request, response) {
    try {
      const setData = request.body;
      const result = await Address.create(setData, {
        validate: true
      });

      return helper.response(response, 200, result);
    } catch (error) {
      return helper.response(response, 500, { message: error.message || error });
    }
  },
  putAddress: async function (request, response) {
    try {
      const newData = request.body;
      const idAddress = request.params.id || null;
      const result = await Address.update(newData, {
        where: {
          id: idAddress
        },
        validate: true
      });

      if (result >= 1) return helper.response(response, 200, { message: 'Data is updated' });

      return helper.response(response, 400, { message: 'Data is not affected' });
    } catch (error) {
      return helper.response(response, 500, { message: error.message || error });
    }
  },
  deleteAddress: async function (request, response) {
    try {
      const idAddress = request.params.id || null;
      const result = await Address.destroy({
        where: {
          id: idAddress
        }
      });

      if (result >= 1) return helper.response(response, 200, { message: 'Data has been deleted' });

      return helper.response(response, 400, { message: 'Data is not affected' });
    } catch (error) {
      return helper.response(response, 500, { message: error.message || error });
    }
  }
};
