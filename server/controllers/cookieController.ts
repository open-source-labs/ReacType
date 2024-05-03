import { CookieController } from '../interfaces';


const cookieController: CookieController = {
  // setSSIDCookie - store the user id from database in cookie
  setSSIDCookie: (req, res, next) => {
    // set cookie with key 'ssid' and value to user's id
    res.cookie('ssid', res.locals.id, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      //maxAge: 60 * 60 * 1000 * 24  //uncomment to set expiration of cookies, but make sure there is something in place to expire local storage info too

    });

    res.cookie('username', res.locals.username, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    return next();
  }, 

  deleteCookies: (req, res, next) => {

    res.clearCookie('ssid');
    res.clearCookie('username');
    res.clearCookie('connect.sid');
    return next();
  }


};

export default cookieController;
