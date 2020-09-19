const categoryModels = require('../model/product');
const helper = require('../helper');
const { Connection, Sequelize } = require('../config/sequelize');

module.exports = {
  getCategory: async function (_request, response) {
    try {
      const result = await categoryModels(Connection, Sequelize);
      result.findAll().then(product => product);

      return helper.response(response, 200, result);
    } catch (error) {
      return helper.response(response, 500, { message: error });
    }
  }
};
