const cookieController = {};

// setSSIDCookie - store the user id from database in cookie
cookieController.setSSIDCookie = (req, res, next) => {
  // set cookie with key 'ssid' and value to user's id, also set http only
  console.log('Inside setSSIDCookie');

  res.cookie('ssid', res.locals.id, { maxAge: 3600000 });

  console.log('Successful setSSIDCookie, ssid:', res.locals.id);
  return next();
};

module.exports = cookieController;
