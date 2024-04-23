import express, { Request, Response} from 'express';
import userStylesController from '../controllers/userStylesController';
const router = express.Router();

// save new css file
router.post('/save', userStylesController.saveCssFile, (req: Request, res: Response) => {
  res.status(200).json({});
});
export default router;
