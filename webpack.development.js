import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import merge from 'webpack-merge';
import baseConfig from './webpack.config.js';
import path from 'path';
import createNonce from './app/src/utils/createNonce.ts';
import { DEV_PORT } from './config.js';

// merges webpack.config.js with development specific configs
const config = merge(baseConfig, {
  // sets import.meta.env.NODE_ENV to 'development;
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true,
    host: 'localhost',
    port: '8080',
    hot: true, // Hot-reload this server if changes are detected
    compress: true, // Compress (gzip) files that are served
    proxy: {
      '/demoRender': {
        target: `http://localhost:${DEV_PORT}/`
      },
      '/user-styles': {
        target: `http://localhost:${DEV_PORT}/`
      },
      '/auth/**': {
        target: 'http://localhost:5656/'
      },
      '/**': {
        target: 'http://localhost:5656/'
      }
    }
  },
  plugins: [
    // miniCssExtractPlugin is included here because it's used as a loader in wepack.config.js
    new MiniCssExtractPlugin(),
    // simplifies creation of HTML files that serve webpack bundles
    // creates a index.html file in the dist folder using index.html as a template
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'app/src/public/index.ejs'),
      filename: 'index.html',
      nonce: createNonce()
    })
  ]
});

export default config;
