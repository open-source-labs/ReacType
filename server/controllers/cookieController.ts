import { CookieController } from '../interfaces';

const cookieController: CookieController = {
  // setSSIDCookie - store the user id from database in cookie
  setSSIDCookie: (req, res, next) => {
    // set cookie with key 'ssid' and value to user's id
    res.cookie('ssid', res.locals.id, {
      httpOnly: true,
      sameSite: 'none',
      secure: true
    });
    return next();
  }, 

};

export default cookieController;
