const HtmlWebpackPlugin = require("html-webpack-plugin");
const CspHtmlWebpackPlugin = require("csp-html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const merge = require("webpack-merge");
const base = require("./webpack.config");
const path = require("path");
const nonce = require("./createNonce")();

// merges webpack.config.js with production specific configs
module.exports = merge(base, {
  // enables optimizations for production mode
  // sets process.env.NODE_ENV to 'production'
  mode: "production",
  // nosources-source-map exposes filenames/structure for stack traces but not the rest of the soruce cdoe
  devtool: "nosources-source-map", //https://webpack.js.org/configuration/devtool/ && https://github.com/webpack/webpack/issues/5627#issuecomment-389492939
  plugins: [
    // miniCssExtractPlugin is included here because it's used as a loader in wepack.config.js
    new MiniCssExtractPlugin(),
    // simplifies creation of HTML files that serve webpack bundles
    // creates a index.html file in the dist folder using index.html as a template
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "app/src/public/index-prod.ejs"),
      filename: "index-prod.html",
      nonce: nonce,
    }),
    // enerate meta content for your Content Security Policy tag and input the correct data into your HTML template
    // Content-Security-Policy response header allows web site administrators to control resources the user agent is allowed to load for a given page
    // policies mostly involve specifying server origins and script endpoints. This helps guard against cross-site scripting attacks
    new CspHtmlWebpackPlugin(
      {
        // only include URIs from the base URL /port
        // TODO: update this URI to allow requests to github
        "base-uri": ["'self'"],
        // object-src is a legacy html feature that's not supported anymore
        // the CSP is restricting this type of element
        "object-src": ["'none'"],
        // specifies valid directories for JS scripts
        // doc can only be served from same url scheme/PORT
        //TODO: may also need to update this for github
        "script-src": ["'self'"],
        // only allow styles from the same URL/port or styles that have a specific nonce
        // the nonce is necessary here so that Material UI styles can render with the CSP
        // https://material-ui.com/styles/advanced/#content-security-policy-csp
        // https://github.com/reZach/secure-electron-template/issues/14metap
        "style-src": ["'self'", `'nonce-${nonce}'`], 
        // does not allow nested browsing contexts (frame/iframe)
        "frame-src": ["'none'"],
        // do not allow worker scripts
        "worker-src": ["'none'"],
      },
      {
        // entry for which policy rules are allowed to include hashes
        hashEnabled: {
          "style-src": false,
        },
      }
    ),
  ],
});
