const helper = require('../helper');
const Cart = require('../model/cart');
const Product = require('../model/product');
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
    },
    {
      model: Product,
      as: 'active_product'
    }
  ],
  attributes: {
    exclude: [
      'user',
      'product'
    ]
  }
};

module.exports = {
  getCart: async function (_request, response) {
    try {
      const result = await Cart.findAll(modelOptions);

      return helper.response(response, 200, result);
    } catch (error) {
      return helper.response(response, 500, { message: error.message || error });
    }
  },
  getCartById: async function (request, response) {
    try {
      const idCart = request.params.id || null;
      const result = await Cart.findByPk(idCart, modelOptions);

      if (!result) return helper.response(response, 400, { message: 'Bad parameter' });

      return helper.response(response, 200, result);
    } catch (error) {
      return helper.response(response, 500, { message: error.message || error });
    }
  },
  getCartByUser: async function (request, response) {
    try {
      const idUser = request.params.id || null;
      const result = await Cart.findAll({
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
  postCart: async function (request, response) {
    try {
      const setData = request.body;
      const result = await Cart.create(setData, {
        validate: true
      });

      return helper.response(response, 200, result);
    } catch (error) {
      return helper.response(response, 500, { message: error.message || error });
    }
  },
  putCart: async function (request, response) {
    try {
      let newData = request.body;
      const idCart = request.params.id || null;
      const cartType = request.params.type || null;
      let result;

      if (!newData.quantity) {
        return helper.response(response, 400, { message: 'Bad input' });
      } else {
        newData = newData.quantity || null;
      }
      if (!cartType) return helper.response(response, 400, { message: 'Bad parameter' });
      if (newData < 1) return helper.response(response, 400, { message: 'Cannot reduce Order below 0 (-1, -5, etc)' });

      cartType === 'increment'
        ? result = await Cart.increment('quantity', {
          where: {
            id: idCart
          },
          by: newData
        })
        : (cartType === 'decrement'
          ? result = await Cart.decrement('quantity', {
            where: {
              id: idCart
            },
            by: newData
          })
          : result = null);

      if (result[0][1] >= 1) return helper.response(response, 200, { message: 'Data is updated' });

      return helper.response(response, 400, { message: 'Data is not affected' });
    } catch (error) {
      return helper.response(response, 500, { message: error.message || error });
    }
  },
  deleteCart: async function (request, response) {
    try {
      const idCart = request.params.id || null;
      const result = await Cart.destroy({
        where: {
          id: idCart
        }
      });

      if (result >= 1) return helper.response(response, 200, { message: 'Data has been deleted' });

      return helper.response(response, 400, { message: 'Data is not affected' });
    } catch (error) {
      return helper.response(response, 500, { message: error.message || error });
    }
  }
};
