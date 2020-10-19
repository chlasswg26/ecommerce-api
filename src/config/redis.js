const redis = require('redis');
const dotenv = require('dotenv');
dotenv.config();

const RedisClient = redis.createClient({
  host: process.env.REDIS_HOST || process.env.HOST,
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  tls: process.env.REDIS_TLS || false
});

RedisClient.on('error', function (error) {
  console.log('Something went wrong', error);
});

RedisClient.on('connect', function () {
  console.log('Redis client connected');
});

module.exports = RedisClient;
