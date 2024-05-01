const isProduction: boolean = process.env.NODE_ENV === 'production';

interface ServerConfig {
    DEV_PORT: number;
    API_BASE_URL: string;
    API_BASE_URL2: string;
}

const serverConfig: ServerConfig = {
    DEV_PORT: 5656,
    API_BASE_URL: isProduction
        ? 'https://app.reactype.dev'
        : 'http://localhost:5656',
    API_BASE_URL2: isProduction
        ? 'https://app.reactype.dev'
        : 'http://localhost:8080'
};

export default serverConfig;