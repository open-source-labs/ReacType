import express from 'express';
import userStylesController from '../controllers/userStylesController.mjs';
const router = express.Router();

// save new css file
router.post('/save', userStylesController.saveCssFile, (req, res) => {
  res.status(200).json({});
});
export default router;
