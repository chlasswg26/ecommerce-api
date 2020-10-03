const helper = require('../helper');
const Banner = require('../model/banner');

module.exports = {
  getBanner: async function (_request, response) {
    try {
      const result = await Banner.findAll();

      return helper.response(response, 200, result);
    } catch (error) {
      return helper.response(response, 500, { message: error.message });
    }
  },
  getBannerById: async function (request, response) {
    try {
      const idBanner = request.params.id || null;
      const result = await Banner.findByPk(idBanner);

      if (!result) return helper.response(response, 400, { message: 'Bad parameter' });

      return helper.response(response, 200, result);
    } catch (error) {
      return helper.response(response, 500, { message: error.message });
    }
  },
  postBanner: async function (request, response) {
    try {
      const setData = request.body;
      const file = request.file;

      if (file) setData.image = file.filename;

      const result = await Banner.create(setData, {
        validate: true
      });

      return helper.response(response, 200, result);
    } catch (error) {
      return helper.response(response, 500, { message: error.message });
    }
  },
  putBanner: async function (request, response) {
    try {
      const newData = request.body;
      const idBanner = request.params.id || null;
      const file = request.file;

      if (file) newData.image = file.filename;

      const result = await Banner.update(newData, {
        where: {
          id: idBanner
        }
      });

      if (result >= 1) return helper.response(response, 200, newData);

      return helper.response(response, 400, { message: 'Data is not affected' });
    } catch (error) {
      return helper.response(response, 500, { message: error.message });
    }
  },
  deleteBanner: async function (request, response) {
    try {
      const idBanner = request.params.id || null;
      const result = await Banner.destroy({
        where: {
          id: idBanner
        }
      });

      if (result >= 1) return helper.response(response, 200, { message: 'Data has been deleted' });

      return helper.response(response, 400, { message: 'Data is not affected' });
    } catch (error) {

    }
  }
};
