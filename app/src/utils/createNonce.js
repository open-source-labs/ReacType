const { v4: uuidv4 } = require('uuid');

// Generate an arbitrary number
// this arbitrary number will be used in CspHtmlWebpackPlugin and HtmlWebpackPlugin configuration in webpack
module.exports = function() {
  return new Buffer.from(uuidv4()).toString('base64');
};
