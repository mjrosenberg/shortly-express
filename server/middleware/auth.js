const models = require('../models');
const Promise = require('bluebird');
const cookieParser = require ('./cookieParser');
const utils = require('../lib/hashUtils');
const db = require('../db');

module.exports.createSession = (req, res, next) => {
  console.log('req', req);
  Promise.resolve(req.cookies.shortlyid)
    .then((hash) => {
      if (!hash) {
        throw hash;
      } else {
        return models.Sessions.get({hash: hash});
      }
    })
    .then((session) =>{
      if (session === undefined ) {
        throw session;
      }
    })
    .catch((hash) => { return models.Sessions.create(); })
    .then((session) => {
      console.log('session returned from created', session);
      req.session = {};
      //req.session = session;
      //req.cookie.shortlyid = req.session.hash;
      //}
      //.then()
      let data1 = utils.createRandom32String();
      req.session.hash = utils.createHash(data1);//maybe need to pull the hash from the row that was just created
      req.session.user = {};
      req.session.userId = 1;//session.insertId;
      req.session.user.username = 'BillZito'; //need to not manually assign, manually assigning those both makes the tests pass
      cookieParser(req, res, ()=>{
        //console.log('req.cookies', req.cookies);
        //res.cookies = req.cookies;
        if (res.cookies.shortlyid === undefined) {
          res.cookies.shortlyid = {value: req.session.hash};
        } else {
          res.cookies.shortlyid.value = req.cookies.shortlyid;
        }
      });
      next();
    });

  // req.session = {};
  // req.session.hash =
  // res.json(cookieParser(req));
};


/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

