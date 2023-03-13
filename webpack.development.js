const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const base = require('./webpack.config');
const path = require('path');
const nonce = require('./app/src/utils/createNonce')();
const {DEV_PORT} = require('./config');

// merges webpack.config.js with development specific configs
module.exports = merge(base, {
  // sets process.env.NODE_ENV to 'development;
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true,
    host: 'localhost',
    port: '8080',
    hot: true, // Hot-reload this server if changes are detected
    compress: true, // Compress (gzip) files that are served
    // contentBase: path.resolve(__dirname, 'app/dist'), // Where we serve the local dev server's files from, not valid devserver
    // watchContentBase: true, // Watch the content base for changes , also not valid for dev server
    // watchOptions: {
    //   ignored: /node_modules/,
    // }, //watchOptions not valid dev server config
    proxy: {
      '/demoRender': {
        target: `http://localhost:${DEV_PORT}/`
      },
      '/user-styles': {
        target: `http://localhost:${DEV_PORT}/`
      },
      '/auth/**': {
        target: `http://localhost:5656/`
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
      nonce: nonce
    })
  ]
});
