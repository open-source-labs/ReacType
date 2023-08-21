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

  /**
   * Stores the current user's username in cookie (for use in cloning projects)
   */
  setUserCookie: (req, res, next) => {
    res.cookie('username', res.locals.username, {
      httpOnly: true, 
      sameSite: 'none', 
      secure: true
    });
    return next();
  }
};

export default cookieController;
