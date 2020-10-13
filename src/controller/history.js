const helper = require('../helper');
const Address = require('../model/address');
const History = require('../model/history');
const Payment = require('../model/payment');
const Product = require('../model/product');
const User = require('../model/user');
const modelOptions = {
  include: [
    {
      model: User,
      as: 'active_seller',
      attributes: {
        exclude: [
          'password',
          'verify_code'
        ]
      }
    },
    {
      model: User,
      as: 'active_customer',
      attributes: {
        exclude: [
          'password',
          'verify_code'
        ]
      }
    },
    {
      model: Product,
      as: 'active_product'
    },
    {
      model: Payment,
      as: 'active_payment'
    },
    {
      model: Address,
      as: 'active_address'
    }
  ],
  attributes: {
    exclude: [
      'seller',
      'customer',
      'product',
      'payment',
      'address'
    ]
  }
};

module.exports = {
  getHistory: async function (_request, response) {
    try {
      const result = await History.findAll(modelOptions);

      return helper.response(response, 200, result);
    } catch (error) {
      return helper.response(response, 500, { message: error.message || error });
    }
  },
  getHistoryById: async function (request, response) {
    try {
      const idHistory = request.params.id || null;
      const result = await History.findByPk(idHistory, modelOptions);

      if (!result) return helper.response(response, 400, { message: 'Bad parameter' });

      return helper.response(response, 200, result);
    } catch (error) {
      return helper.response(response, 500, { message: error.message || error });
    }
  },
  getHistoryBySeller: async function (request, response) {
    try {
      const idSeller = request.params.id || null;
      const result = await History.findAll({
        where: {
          seller: idSeller
        },
        ...modelOptions
      });

      if (!result) return helper.response(response, 400, { message: 'Bad parameter' });

      return helper.response(response, 200, result);
    } catch (error) {
      return helper.response(response, 500, { message: error.message || error });
    }
  },
  getHistoryByCustomer: async function (request, response) {
    try {
      const idCustomer = request.params.id || null;
      const result = await History.findAll({
        where: {
          customer: idCustomer
        },
        ...modelOptions
      });

      if (!result) return helper.response(response, 400, { message: 'Bad parameter' });

      return helper.response(response, 200, result);
    } catch (error) {
      return helper.response(response, 500, { message: error.message || error });
    }
  },
  postHistory: async function (request, response) {
    try {
      const setData = request.body;
      const result = await History.create(setData, {
        validate: true
      });

      return helper.response(response, 200, result);
    } catch (error) {
      return helper.response(response, 500, { message: error.message || error });
    }
  },
  putHistory: async function (request, response) {
    try {
      const newData = request.body;
      const idHistory = request.params.id || null;
      const result = await History.update(newData, {
        where: {
          id: idHistory
        }
      });

      if (result >= 1) return helper.response(response, 200, { message: 'Data is updated' });

      return helper.response(response, 400, { message: 'Data is not affected' });
    } catch (error) {
      return helper.response(response, 500, { message: error.message || error });
    }
  },
  deleteHistory: async function (request, response) {
    try {
      const idHistory = request.params.id || null;
      const result = await History.destroy({
        where: {
          id: idHistory
        }
      });

      if (result >= 1) return helper.response(response, 200, { message: 'Data has been deleted' });

      return helper.response(response, 400, { message: 'Data is not affected' });
    } catch (error) {
      return helper.response(response, 500, { message: error.message || error });
    }
  }
};
