const HtmlWebpackPlugin = require('html-webpack-plugin');
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const base = require('./webpack.config');
const path = require('path');
const nonce = require('./app/src/utils/createNonce')();

// merges webpack.config.js with development specific configs
module.exports = merge(base, {
  // enables optimizations for development mode
  // sets process.env.NODE_ENV to 'development;
  mode: 'development',
  // source map maps compressed files to original position in source file for debugging
  // TODO: the source-map devtool option is relatively slow, the docs recommend several other options for debugging in a dev env
  // https://webpack.js.org/configuration/devtool/
  // devtool: "source-map", // Show the source map so we can debug when developing locally
  devtool: 'inline-source-map',
  devServer: {
    host: 'localhost',
    port: '8080',
    hot: true, // Hot-reload this server if changes are detected
    compress: true, // Compress (gzip) files that are served
    contentBase: path.resolve(__dirname, 'app/dist'), // Where we serve the local dev server's files from
    watchContentBase: true, // Watch the content base for changes
    watchOptions: {
      ignored: /node_modules/ // Ignore this path, probably not needed since we define contentBase above
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
    // TODO: Update CSP so that it can upload external stylesheets
    //   // enerate meta content for your Content Security Policy tag and input the correct data into your HTML template
    //   // Content-Security-Policy response header allows web site administrators to control resources the user agent is allowed to load for a given page
    //   // policies mostly involve specifying server origins and script endpoints. This helps guard against cross-site scripting attacks
    //   new CspHtmlWebpackPlugin({
    //     // only include URIs from the base URL /port
    //     // TODO: update this URI to allow requests to github
    //     'base-uri': ["'self'"],
    //     // object-src is a legacy html feature that's not supported anymore
    //     // the CSP is restricting this type of element
    //     'object-src': ["'none'"],
    //     // specifies valid directories for JS scripts
    //     // doc can only be served from same url scheme/PORT
    //     //TODO: may also need to update this for github
    //     'script-src': ["'self'"],
    //     // only allow styles from the same URL/port or styles that have a specific nonce
    //     // the nonce is necessary here so that Material UI styles can render with the CSP
    //     // https://material-ui.com/styles/advanced/#content-security-policy-csp
    //     // https://github.com/reZach/secure-electron-template/issues/14metap
    //     'style-src': [
    //       "'self'",
    //       `'nonce-${nonce}'`,
    //     ],
    //     'font-src': ["'self'"],
    //     // does not allow nested browsing contexts (frame/iframe)
    //     'frame-src': ["'none'"],
    //     // do not allow worker scripts
    //     'worker-src': ["'none'"]
    //   })
  ]
});
