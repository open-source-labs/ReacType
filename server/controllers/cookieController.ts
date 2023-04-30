const cookieController = {};

// setSSIDCookie - store the user id from database in cookie
cookieController.setSSIDCookie = (req, res, next) => {
  // set cookie with key 'ssid' and value to user's id
  res.cookie('ssid', res.locals.id, {
    httpOnly: true,
    sameSite: 'None',
    secure: true
  });
  return next();
};

export default cookieController;
