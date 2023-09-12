import express from 'express';
const passport = require('passport');
import config from '../../config';
import { Request } from 'express';

// trying to add interface
interface UserReq extends Request {
  user: {
    id: string;
  };
}

const { API_BASE_URL } = config;
const router = express.Router();

router.get(
  '/github',
  passport.authenticate('github', {
    scope: ['profile']
  })
);

router.get(
  '/github/callback',
  passport.authenticate('github'),
  (req: UserReq, res) => {
    console.log('this authenticate function is being run');
    console.log(req.user.id);
    res.cookie('ssid', req.user.id);
    return res.redirect(API_BASE_URL);
  }
);

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile']
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google'),
  (req: UserReq, res) => {
    console.log('google authenicate function being run');
    res.cookie('ssid', req.user.id);
    return res.redirect(API_BASE_URL);
  }
);

export default router;
