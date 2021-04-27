const fs = require('fs');
const path = require('path');


const userStylesController = {};

// Rewrite file
userStylesController.saveCssFile = (req, res, next) => {
  const newText = req.body.data;
  fs.writeFile(path.join(__dirname, '../../app/src/components/main/renderDemo.css'), newText, 'utf-8', (err, data) => {
    if (err) throw err;
    console.log('CSS Updated!');
    next();
  });
};


module.exports = userStylesController;
