const RedisClient = require('../config/redis');
const helper = require('../helper');

module.exports = {
  cache: function (request, response, next) {
    const redisKey = helper.redis(request.query);

    RedisClient.get(`product:${redisKey}`, (error, result) => {
      if (error) throw error;

      if (result !== null) {
        console.log('redis filled');
        const cache = JSON.parse(result);

        return helper.response(response, 200, cache.data, cache.pagination);
      } else {
        console.log('redis not set, next please');
        next();
      }
    });
  }
};
