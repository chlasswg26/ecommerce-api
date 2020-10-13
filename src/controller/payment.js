const helper = require('../helper');
const Payment = require('../model/payment');

module.exports = {
  getPayment: async function (_request, response) {
    try {
      const result = await Payment.findAll();

      return helper.response(response, 200, result);
    } catch (error) {
      return helper.response(response, 500, { message: error.message || error });
    }
  },
  getPaymentById: async function (request, response) {
    try {
      const idPayment = request.params.id || null;
      const result = await Payment.findByPk(idPayment);

      if (!result) return helper.response(response, 400, { message: 'Bad parameter' });

      return helper.response(response, 200, result);
    } catch (error) {
      return helper.response(response, 500, { message: error.message || error });
    }
  },
  postPayment: async function (request, response) {
    try {
      const setData = request.body;
      const file = request.file;

      if (file) setData.image = file.filename;

      const result = await Payment.create(setData, {
        validate: true
      });

      return helper.response(response, 200, result);
    } catch (error) {
      return helper.response(response, 500, { message: error.message || error });
    }
  },
  putPayment: async function (request, response) {
    try {
      const newData = request.body;
      const idPayment = request.params.id || null;
      const file = request.file;

      if (file) newData.image = file.filename;

      const result = await Payment.update(newData, {
        where: {
          id: idPayment
        }
      });

      if (result >= 1) return helper.response(response, 200, { message: 'Data is updated' });

      return helper.response(response, 400, { message: 'Data is not affected' });
    } catch (error) {
      return helper.response(response, 500, { message: error.message || error });
    }
  },
  deletePayment: async function (request, response) {
    try {
      const idPayment = request.params.id || null;
      const result = await Payment.destroy({
        where: {
          id: idPayment
        }
      });

      if (result >= 1) return helper.response(response, 200, { message: 'Data has been deleted' });

      return helper.response(response, 400, { message: 'Data is not affected' });
    } catch (error) {
      return helper.response(response, 500, { message: error.message || error });
    }
  }
};
