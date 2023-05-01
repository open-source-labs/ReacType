import fs from 'fs';
import path from 'path';
import { Request, Response, NextFunction } from 'express';

const userStylesController = {
  // Rewrite file
  saveCssFile: (req: Request, res: Response, next: NextFunction) => {
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
