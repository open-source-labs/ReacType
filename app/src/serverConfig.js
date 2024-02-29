const isProduction = process.env.NODE_ENV === 'production';
const serverConfig = {
  DEV_PORT: 5656,
  API_BASE_URL: isProduction
    ? 'https://reactype-2c81e4204f81.herokuapp.com'
    : 'http://localhost:5656',
  // : 'http://localhost:8080',
  API_BASE_URL2: isProduction
    ? 'https://reactype-2c81e4204f81.herokuapp.com'
    : 'http://localhost:8080'
};
// module.exports = config;

export default serverConfig;
