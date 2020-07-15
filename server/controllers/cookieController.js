const cookieController = {};

// setSSIDCookie - store the user id from database in cookie
cookieController.setSSIDCookie = (req, res, next) => {
  // set cookie with key 'ssid' and value to user's id
  res.cookie('ssid', res.locals.id);
  return next();
};

module.exports = cookieController;
