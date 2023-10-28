const isProduction = process.env.NODE_ENV === 'production';
const config = {
  DEV_PORT: 5656,
  API_BASE_URL: isProduction
    ? 'https://app.reactype.dev'
    //: 'http://localhost:8080',
  : 'http://localhost:5656',
  API_BASE_URL2: isProduction
    ? 'https://app.reactype.dev'
    : 'http://localhost:8080',
};
module.exports = config;
