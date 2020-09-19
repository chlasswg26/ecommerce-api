const redis = require('redis');
const RedisClient = redis.createClient(6379);

RedisClient.on('error', function (error) {
  console.log('Something went wrong', error);
});

RedisClient.on('connect', function () {
  console.log('Redis client connected');
});

module.exports = RedisClient;
