const helper = require('../helper');
const Category = require('../model/category');

module.exports = {
  getCategory: async function (_request, response) {
    try {
      const result = await Category.findAll();

      return helper.response(response, 200, result);
    } catch (error) {
      return helper.response(response, 500, { message: error });
    }
  },
  getCategoryById: async function (request, response) {
    try {
      const idCategory = request.params.id;
      const result = await Category.findAll({
        where: {
          id: idCategory
        }
      });

      return helper.response(response, 200, result);
    } catch (error) {
      return helper.response(response, 500, { message: error });
    }
  },
  postCategory: async function (request, response) {
    try {
      const setData = request.body;
      const result = await Category.create(setData);

      return helper.response(response, 200, result);
    } catch (error) {
      return helper.response(response, 500, { message: error });
    }
  },
  putCategory: async function (request, response) {
    try {
      const newData = request.body;
      const idCategory = request.params.id;
      const result = await Category.update(newData, {
        where: {
          id: idCategory
        }
      });

      if (result[0] >= 1) {
        return helper.response(response, 200, newData);
      }

      return helper.response(response, 200, { message: 'Data is not affected' });
    } catch (error) {
      return helper.response(response, 500, { message: error });
    }
  },
  deleteCategory: async function (request, response) {
    try {
      const idCategory = request.params.id;
      const result = await Category.destroy({
        where: {
          id: idCategory
        }
      });

      if (result >= 1) {
        return helper.response(response, 200);
      }

      return helper.response(response, 200, { message: 'Data is not affected' });
    } catch (error) {
      return helper.response(response, 500, { message: error });
    }
  }
};
