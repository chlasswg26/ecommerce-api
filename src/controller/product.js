const { Op } = require('sequelize');
const helper = require('../helper');
const Product = require('../model/product');

module.exports = {
  getProduct: async function (request, response) {
    try {
      const filter = request.query;
      const page = parseInt(filter.page || 1);
      const limit = parseInt(filter.limit || 5);
      const start = parseInt((page - 1) * limit);
      const search = filter.search || null;
      const sort = filter.sort || 'updated';
      const order = filter.order || 'DESC';
      let result, pagination;

      if (search) {
        const { count, rows } = await Product.findAndCountAll({
          where: {
            name: {
              [Op.like]: `%${search}%`
            }
          },
          order: [
            [
              sort,
              order
            ]
          ],
          offset: start,
          limit: limit
        });
        result = rows;
        pagination = {
          limit: limit,
          records: Math.ceil(parseInt(count) / limit),
          pages: {
            current: page,
            next: ((page + 1) - Math.ceil(parseInt(count) / limit)) >= 1 ? null : page + 1,
            previous: (page - 1) <= 0 ? null : page - 1
          }
        };
      } else {
        const { count, rows } = await Product.findAndCountAll({
          order: [
            [
              sort,
              order
            ]
          ],
          offset: start,
          limit: limit
        });
        result = rows;
        pagination = {
          limit: limit,
          records: Math.ceil(parseInt(count) / limit),
          pages: {
            current: page,
            next: ((page + 1) - Math.ceil(parseInt(count) / limit)) >= 1 ? null : page + 1,
            previous: (page - 1) <= 0 ? null : page - 1
          }
        };
      }

      return helper.response(response, 200, result, pagination);
    } catch (error) {
      return helper.response(response, 500, { message: error.message });
    }
  },
  getProductById: async function (request, response) {
    try {
      const idProduct = request.params.id || null;
      const result = await Product.findByPk(idProduct);

      if (!result) return helper.response(response, 400, { message: 'Bad parameter' });

      return helper.response(response, 200, result);
    } catch (error) {
      return helper.response(response, 500, { message: error.message });
    }
  },
  getProductBySeller: async function (request, response) {
    try {
      const idSeller = request.params.id || null;
      const result = await Product.findAll({
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
  postProduct: async function (request, response) {
    try {
      const setData = request.body;
      const file = request.file;

      if (file) setData.image = file.filename;

      const result = await Product.create(setData, {
        validate: true
      });

      return helper.response(response, 200, result);
    } catch (error) {
      return helper.response(response, 500, { message: error.message });
    }
  },
  putProduct: async function (request, response) {
    try {
      const newData = request.body;
      const idProduct = request.params.id || null;
      const file = request.file;

      if (file) newData.image = file.filename;

      const result = await Product.update(newData, {
        where: {
          id: idProduct
        }
      });

      if (result >= 1) return helper.response(response, 200, { message: 'Data is updated' });

      return helper.response(response, 400, { message: 'Data is not affected' });
    } catch (error) {
      return helper.response(response, 500, { message: error.message });
    }
  },
  deleteProduct: async function (request, response) {
    try {
      const idProduct = request.params.id || null;
      const result = await Product.destroy({
        where: {
          id: idProduct
        }
      });

      if (result >= 1) return helper.response(response, 200, { message: 'Data has been deleted' });

      return helper.response(response, 400, { message: 'Data is not affected' });
    } catch (error) {
      return helper.response(response, 500, { message: error.message });
    }
  }
};
