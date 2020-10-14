const dotenv = require('dotenv');
dotenv.config();
const RedisClient = require('../config/redis');
const { Op } = require('sequelize');
const helper = require('../helper');
const Category = require('../model/category');
const Product = require('../model/product');
const User = require('../model/user');
const modelOptions = {
  include: [
    {
      model: Category,
      as: 'active_category'
    },
    {
      model: User,
      as: 'active_seller',
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
      'category',
      'seller'
    ]
  }
};

module.exports = {
  getProduct: async function (request, response) {
    try {
      const filter = request.query;
      const redisKey = helper.redis(filter);
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
          ...modelOptions,
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
          records: {
            total: count,
            sheet: Math.ceil(parseInt(count) / limit)
          },
          pages: {
            limit: limit,
            current: page,
            next: ((page + 1) - Math.ceil(parseInt(count) / limit)) >= 1 ? null : page + 1,
            previous: (page - 1) <= 0 ? null : page - 1
          }
        };
      } else {
        const { count, rows } = await Product.findAndCountAll({
          ...modelOptions,
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
          records: {
            total: count,
            sheet: Math.ceil(parseInt(count) / limit)
          },
          pages: {
            limit: limit,
            current: page,
            next: ((page + 1) - Math.ceil(parseInt(count) / limit)) >= 1 ? null : page + 1,
            previous: (page - 1) <= 0 ? null : page - 1
          }
        };
      }

      const cached = {
        data: result,
        pagination: pagination
      };

      RedisClient.setex(
        `product:${redisKey}`,
        process.env.CACHE_EXPIRY,
        JSON.stringify(cached),
        function (error, reply) {
          if (error) return helper.response(response, 500, { message: error });

          console.log('redis set cache', reply);
        }
      );

      return helper.response(response, 200, result, pagination);
    } catch (error) {
      return helper.response(response, 500, { message: error.message || error });
    }
  },
  getProductById: async function (request, response) {
    try {
      const idProduct = request.params.id || null;
      const result = await Product.findByPk(idProduct, modelOptions);

      if (!result) return helper.response(response, 400, { message: 'Bad parameter' });

      return helper.response(response, 200, result);
    } catch (error) {
      return helper.response(response, 500, { message: error.message || error });
    }
  },
  getProductBySeller: async function (request, response) {
    try {
      const idSeller = request.params.id || null;
      const filter = request.query;
      const redisKey = helper.redis(filter);
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
            [Op.and]: [
              {
                name: {
                  [Op.like]: `%${search}%`
                }
              },
              {
                seller: idSeller
              }
            ]
          },
          ...modelOptions,
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
          records: {
            total: count,
            sheet: Math.ceil(parseInt(count) / limit)
          },
          pages: {
            limit: limit,
            current: page,
            next: ((page + 1) - Math.ceil(parseInt(count) / limit)) >= 1 ? null : page + 1,
            previous: (page - 1) <= 0 ? null : page - 1
          }
        };
      } else {
        const { count, rows } = await Product.findAndCountAll({
          where: {
            seller: idSeller
          },
          ...modelOptions,
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
          records: {
            total: count,
            sheet: Math.ceil(parseInt(count) / limit)
          },
          pages: {
            limit: limit,
            current: page,
            next: ((page + 1) - Math.ceil(parseInt(count) / limit)) >= 1 ? null : page + 1,
            previous: (page - 1) <= 0 ? null : page - 1
          }
        };
      }

      if (!result) return helper.response(response, 400, { message: 'Bad parameter' });

      const cached = {
        data: result,
        pagination: pagination
      };

      RedisClient.setex(
        `product:${redisKey}`,
        process.env.CACHE_EXPIRY,
        JSON.stringify(cached),
        function (error, reply) {
          if (error) return helper.response(response, 500, { message: error });

          console.log('redis set cache', reply);
        }
      );

      return helper.response(response, 200, result, pagination);
    } catch (error) {
      return helper.response(response, 500, { message: error.message || error });
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
      return helper.response(response, 500, { message: error.message || error });
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
      return helper.response(response, 500, { message: error.message || error });
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
      return helper.response(response, 500, { message: error.message || error });
    }
  }
};
