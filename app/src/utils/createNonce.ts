/* eslint-disable max-len */
const { v4: uuidv4 } = require('uuid');
// const Buffer  = require('buffer');

// const buf = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
// module.exports = buf;

// Generate an arbitrary number
// this arbitrary number will be used in CspHtmlWebpackPlugin and HtmlWebpackPlugin configuration in webpack
module.exports = function () {
  return new Buffer.from(uuidv4()).toString('base64');
};
