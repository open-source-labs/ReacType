const express = require('express');
const router = express.Router(); 

// Controllers
const userStylesController = require('../controllers/userStylesController');

// save new css file
router.post('/save', userStylesController.saveCssFile, (req, res) => {
  res.status(200).json({});
});

module.exports = router;
