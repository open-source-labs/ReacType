const cookieController = {};

// setCookie = set a cookie with a random number

cookieController.setCookie = (req, res, next) => {
  // set cookie with key of 'secret' and value of a random number between 0 and 1000
  res.cookie('secret', Math.floor(Math.random() * 1000));
  return next();
};

// setSSIDCookie - store the user id from database in cookie
cookieController.setSSIDCookie = (req, res, next) => {
  // set cookie with key 'ssid' and value to user's id, also set http only
  res.cookie('ssid', res.locals.id, { httpOnly: true });
  return next();
};
