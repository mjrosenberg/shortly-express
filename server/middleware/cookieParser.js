const parseCookies = (req, res, next) => {
  //console.log('req.headers', req.headers);
  if (req.headers.cookie !== undefined) {
    var cookieList = req.headers.cookie.split('; ');
    //console.log(cookieList);
    for (item of cookieList) {
      var newList = item.split('=');
      //console.log(newList);
      req.cookies[newList[0]] = newList[1];
    }
    //unsure if we are supposed to be modifying the request, but that is what the tests essentially say to do
    //console.log(req.cookies);
  }
  next();
};

module.exports = parseCookies;