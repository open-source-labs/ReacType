
// Implementing a custom protocol achieves two goals:
//   1) Allows us to use ES6 modules/targets for Angular
//   2) Avoids running the app in a file:// origin

const fs = require('fs');
const path = require('path');

const DIST_PATH = path.join(__dirname, '../../app/dist');
const scheme = 'app';

const mimeTypes = {
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.html': 'text/html',
  '.htm': 'text/html',
  '.json': 'application/json',
  '.css': 'text/css',
  '.svg': 'application/svg+xml',
  '.ico': 'image/vnd.microsoft.icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.map': 'text/plain'
};

function charset(mimeType) {
  return ['.html', '.htm', '.js', '.mjs'].some(m => m === mimeType)
    ? 'utf-8'
    : null;
}

function mime(filename) {
  const type = mimeTypes[path.extname(`${filename || ''}`).toLowerCase()];
  return type ? type : null;
}

function requestHandler(req, next) {
  const reqUrl = new URL(req.url);
  let reqPath = path.normalize(reqUrl.pathname);
  if (reqPath === '/') {
    reqPath = '/index-prod.html';
  }
  const reqFilename = path.basename(reqPath);
  fs.readFile(path.join(DIST_PATH, reqPath), (err, data) => {
    const mimeType = mime(reqFilename);
    if (!err && mimeType !== null) {
      next({
        mimeType: mimeType,
        charset: charset(mimeType),
        data: data
      });
    } else {
      console.error(err);
    }
  });
}

module.exports = {
  scheme,
  requestHandler
};
