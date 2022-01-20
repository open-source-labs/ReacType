const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const base = require('./webpack.config');
const path = require('path');
const nonce = require('./app/src/utils/createNonce')();

// merges webpack.config.js with development specific configs
module.exports = merge(base, {
  // sets process.env.NODE_ENV to 'development;
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    host: 'localhost',
    port: '8080',
    hot: true, // Hot-reload this server if changes are detected
    compress: true, // Compress (gzip) files that are served
    contentBase: path.resolve(__dirname, 'app/dist'), // Where we serve the local dev server's files from
    watchContentBase: true, // Watch the content base for changes
    watchOptions: {
      ignored: /node_modules/ 
    },
    proxy: {
      '/demoRender': {
        target: 'http://localhost:5000/'
      },
      '/user-styles': {
        target: 'http://localhost:5000/'
      },
    },
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
  ],
});
