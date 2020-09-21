const helper = require('../helper');
const Address = require('../model/address');

module.exports = {
  getAddress: async function (_request, response) {
    try {
      const result = await Address.findAll();

      return helper.response(response, 200, result);
    } catch (error) {
      return helper.response(response, 500, { message: error.message });
    }
  },
  getAddressById: async function (request, response) {
    try {
      const idAddress = request.params.id || 0;
      const result = await Address.findAll({
        where: {
          id: idAddress
        }
      });

      return helper.response(response, 200, result);
    } catch (error) {
      return helper.response(response, 500, { message: error.message });
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
      return helper.response(response, 500, { message: error.message });
    }
  },
  putAddress: async function (request, response) {
    try {
      const newData = request.body;
      const idAddress = request.params.id || 0;
      const result = await Address.update(newData, {
        where: {
          id: idAddress
        },
        validate: true
      });

      if (result[0] >= 1) {
        return helper.response(response, 200, newData);
      }

      return helper.response(response, 200, { message: 'Data is not affected' });
    } catch (error) {
      return helper.response(response, 500, { message: error.message });
    }
  },
  deleteAddress: async function (request, response) {
    try {
      const idAddress = request.params.id || 0;
      const result = await Address.destroy({
        where: {
          id: idAddress
        }
      });

      if (result >= 1) {
        return helper.response(response, 200);
      }

      return helper.response(response, 200, { message: 'Data is not affected' });
    } catch (error) {
      return helper.response(response, 500, { message: error.message });
    }
  }
};
