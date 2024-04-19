import express from 'express';
const passport = require('passport');
import config from '../../config';
import { Request } from 'express';
import sessionController from '../controllers/sessionController';

// trying to add interface
interface UserReq extends Request {
  user: {
    id: string;
    username: string;
    googleId: string;
  };
}

const { API_BASE_URL2 } = config;
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
  sessionController.startSession,
  (req: UserReq, res) => {
    console.log('github authenticate function is being run');
    console.log(req.user.id);
    res.cookie('ssid', req.user.id, {
      httpOnly: true,
      sameSite: 'none',
      secure: true
    });

    res.cookie('username', req.user.username, {
      httpOnly: true,
      sameSite: 'none',
      secure: true
    });
    return res.redirect(API_BASE_URL2);
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
  sessionController.startSession,
  (req: UserReq, res) => {
    console.log('google authenicate function being run');
    res.cookie('ssid', req.user.id, {
      httpOnly: true,
      sameSite: 'none',
      secure: true
    });

    res.cookie('username', req.user.username, {
      httpOnly: true,
      sameSite: 'none',
      secure: true
    });
    return res.redirect(API_BASE_URL2);
  }
);

export default router;
