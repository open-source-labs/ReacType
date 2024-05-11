import fs from 'fs';
import path from 'path';
import { UserStylesController } from '../interfaces';

const userStylesController: UserStylesController = {
  /**
   * Middleware function to save CSS data to a file.
   *
   * @callback SaveCssFileMiddleware
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @param {Function} next - The next middleware function in the stack.
   * @returns {void} This function does not return anything directly but calls the next middleware function.
   */
  saveCssFile: (req, res, next): void => {
    console.log('I am here in the cstylesController.');
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
