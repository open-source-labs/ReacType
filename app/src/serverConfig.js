const isProduction = process.env.NODE_ENV === 'production';

const serverConfig = {
  DEV_PORT: 5656,
  API_BASE_URL: isProduction
    ? 'http://localhost:5656'
    : 'http://localhost:5656',
  // : 'http://localhost:8080',
  API_BASE_URL2: isProduction
    ? 'http://localhost:5656'
    : 'http://localhost:8080'
};
// module.exports = config;

export default serverConfig;
