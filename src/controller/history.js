const helper = require('../helper');
const History = require('../model/history');

module.exports = {
  getHistory: async function (_request, response) {
    try {
      const result = await History.findAll();

      return helper.response(response, 200, result);
    } catch (error) {
      return helper.response(response, 500, { message: error.message });
    }
  },
  getHistoryById: async function (request, response) {
    try {
      const idHistory = request.params.id || null;
      const result = await History.findByPk(idHistory);

      if (!result) return helper.response(response, 400, { message: 'Bad parameter' });

      return helper.response(response, 200, result);
    } catch (error) {
      return helper.response(response, 500, { message: error.message });
    }
  },
  getHistoryBySeller: async function (request, response) {
    try {
      const idSeller = request.params.id || null;
      const result = await History.findAll({
        where: {
          seller: idSeller
        }
      });

      if (!result) return helper.response(response, 400, { message: 'Bad parameter' });

      return helper.response(response, 200, result);
    } catch (error) {
      return helper.response(response, 500, { message: error.message });
    }
  },
  getHistoryByCustomer: async function (request, response) {
    try {
      const idCustomer = request.params.id || null;
      const result = await History.findAll({
        where: {
          customer: idCustomer
        }
      });

      if (!result) return helper.response(response, 400, { message: 'Bad parameter' });

      return helper.response(response, 200, result);
    } catch (error) {
      return helper.response(response, 500, { message: error.message });
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
      return helper.response(response, 500, { message: error.message });
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
      return helper.response(response, 500, { message: error.message });
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
      return helper.response(response, 500, { message: error.message });
    }
  }
};
