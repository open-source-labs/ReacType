import fs from 'fs';
import path from 'path';

const userStylesController = {};
// Rewrite file
userStylesController.saveCssFile = (req, res, next) => {
  const newText = req.body.data;
  fs.writeFile(
    path.join(__dirname, '../assets/renderDemo.css'),
    newText,
    'utf-8',
    (err, data) => {
      if (err) throw err;
      next();
    }
  );
};

export default userStylesController;
