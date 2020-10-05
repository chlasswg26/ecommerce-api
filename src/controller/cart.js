const helper = require('../helper');
const Cart = require('../model/cart');

module.exports = {
  getCart: async function (_request, response) {
    try {
      const result = await Cart.findAll();

      return helper.response(response, 200, result);
    } catch (error) {
      return helper.response(response, 500, { message: error.message });
    }
  },
  getCartById: async function (request, response) {
    try {
      const idCart = request.params.id || null;
      const result = await Cart.findByPk(idCart);

      if (!result) return helper.response(response, 400, { message: 'Bad parameter' });

      return helper.response(response, 200, result);
    } catch (error) {
      return helper.response(response, 500, { message: error.message });
    }
  },
  getCartByUser: async function (request, response) {
    try {
      const idUser = request.params.id || null;
      const result = await Cart.findAll({
        where: {
          user: idUser
        }
      });

      if (!result) return helper.response(response, 400, { message: 'Bad parameter' });

      return helper.response(response, 200, result);
    } catch (error) {
      return helper.response(response, 500, { message: error.message });
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
      return helper.response(response, 500, { message: error.message });
    }
  },
  putCart: async function (request, response) {
    try {
      const newData = request.body;
      const idCart = request.params.id || null;
      const result = await Cart.update(newData, {
        where: {
          id: idCart
        },
        validate: true
      });

      if (result >= 1) return helper.response(response, 200, { message: 'Data is updated' });

      return helper.response(response, 400, { message: 'Data is not affected' });
    } catch (error) {
      return helper.response(response, 500, { message: error.message });
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
      return helper.response(response, 500, { message: error.message });
    }
  }
};