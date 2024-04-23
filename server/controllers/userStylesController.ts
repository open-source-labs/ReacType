import fs from 'fs';
import path from 'path';
import { UserStylesController } from '../interfaces';

const userStylesController: UserStylesController = {
  // Rewrite file
  saveCssFile: (req, res, next) => {
    const newText = req.body.data;
    fs.writeFile(
      path.join(__dirname, '../assets/renderDemo.css'),
      newText,
      'utf-8',
      (err) => {
        if (err) throw err;
        next();
      }
    );
  }
};

export default userStylesController;
