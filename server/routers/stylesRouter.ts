import express, { Request, Response} from 'express';
import userStylesController from '../controllers/userStylesController';
const router = express.Router();

/**
 * Route handler for saving a new CSS file. Invokes the userStylesController to save the CSS file,
 * and sends a JSON response with status 200.
 *
 * @param {express.Request} req - The request object from Express.
 * @param {express.Response} res - The response object from Express.
 */
router.post('/save', userStylesController.saveCssFile, (req: Request, res: Response) => {
  console.log("I am here in the styles Router.")
  res.status(200).json({});
});
export default router;
