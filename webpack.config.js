const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  },

  // since JS can be written for both server / browser, the "target" specifies what environment webpack should write for
  target: 'web', // Our app can run without electron
  // The entry is where webpack begins assembling the dependency tree
  entry: ['./app/src/index.tsx'], // The entry point of our app; these entry points can be named and we can also have multiple if we'd like to split the webpack bundle into smaller files to improve script loading speed between multiple pages of our app
  // the output is only created on npm run-prod-build
  output: {
    path: path.resolve(__dirname, 'app/dist'), // Where all the output files get dropped after webpack is done with them
    filename: 'bundle.js' // The name of the webpack bundle that's generated
  },
  // If multiple files share the same name but have different extensions,
  // webpack will resolve the one with the extension listed first in the array and skip the rest.
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  plugins: [
    new Dotenv(),
    new webpack.DefinePlugin({
      'import.meta.env.NODE_ENV': JSON.stringify('development')
    })
    // new BundleAnalyzerPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        // loads .html files in the app/src directory
        test: /\.(html)$/,
        include: [path.resolve(__dirname, 'app/src')],
        use: {
          // exports html as string
          loader: 'html-loader',
          // specifies how image strings in URL should be processed in the HTML doc
          // this will require each each local image specified in the src attribute
          options: {
            attributes: {
              list: [
                {
                  tag: 'img',
                  attribute: 'data-src',
                  type: 'src'
                }
              ]
            }
          }
        }
      },
      // loads .js/jsx files
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, 'app/src')],
        loader: 'babel-loader',
        // the resolver helps webpack locate the absolute path of imported modules
        resolve: {
          extensions: ['.js', '.jsx', '.json']
        }
      },
      // loads .css files
      // Mini CSS extract plugin extracts CSS into seperate files
      // creates CSS file per JS file that conatains CSS
      // less duplicate complication than extract-text-webpack-plugin
      // this loader is only be using used for CSS but could also be used for sass
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, 'app/src')],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          }
        ],
        resolve: {
          extensions: ['.css']
        }
      },
      // loads common image formats
      // resolves import/require on a file into a url and emits the file into the output directory
      // url loader converts file into base 64 encoded string that can be passed inline into the file rather than be imported from a seperate file
      // you can set limits for the file size at which this inline encoding happens, but there is no limit set currently
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/i,
        use: 'url-loader'
      }
    ]
  }
};
