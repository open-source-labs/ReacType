const isProduction = process.env.NODE_ENV === 'production';

const config = {
  DEV_PORT: 5656,
  API_BASE_URL: isProduction
    ? 'http://reactypev15-env.eba-mbvivk7k.us-east-1.elasticbeanstalk.com'
    : 'http://localhost:5656',
  API_BASE_URL2: isProduction
    ? 'http://reactypev15-env.eba-mbvivk7k.us-east-1.elasticbeanstalk.com'
    : 'http://localhost:8080'
};

export default config;
