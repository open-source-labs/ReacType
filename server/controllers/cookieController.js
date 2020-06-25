const cookieController = {};

// setSSIDCookie - store the user id from database in cookie
cookieController.setSSIDCookie = (req, res, next) => {
  // set cookie with key 'ssid' and value to user's id, also set http only
  res.cookie('ssid', res.locals.id, { maxAge: 3600000 });
  console.log('Successful setSSIDCookie');
  return next();
};

module.exports = cookieController;
