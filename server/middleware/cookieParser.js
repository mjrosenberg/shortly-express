const parseCookies = (req, res, next) => {
  console.log(req.headers);
  if (req.headers.cookie !== undefined) {
    var cookieList = req.headers.cookie.split('; ');
    console.log(cookieList);
    for (item of cookieList) {
      var newList = item.split('=');
      console.log(newList);
      req.cookies[newList[0]] = newList[1];
    }

    console.log(req.cookies);
  }
  next();
};

module.exports = parseCookies;