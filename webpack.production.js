const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const base = require('./webpack.config');
const path = require('path');
const nonce = require('./app/src/utils/createNonce.ts')();

// merges webpack.config.js with production specific configs
module.exports = merge(base, {
  // sets import.meta.env.NODE_ENV to 'production'
  mode: 'production',
  plugins: [
    // miniCssExtractPlugin is included here because it's used as a loader in wepack.config.js
    new MiniCssExtractPlugin(),
    // simplifies creation of HTML files that serve webpack bundles
    // creates a index.html file in the dist folder using index.html as a template
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'app/src/public/index-prod.ejs'),
      filename: 'index-prod.html',
      nonce: nonce
    })
  ]
});
