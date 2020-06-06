const models = require('../models');
const Promise = require('bluebird');
const cookieParser = require ('./cookieParser');
const utils = require('../lib/hashUtils');
const db = require('../db');

module.exports.createSession = (req, res, next) => {
  //console.log('req', req);
  Promise.resolve(req.cookies.shortlyid)
    .then((hash) => {
      if (!hash) {
        throw hash;
      } else {
        return models.Sessions.get({hash: hash});
      }
    })
    .tap((session) =>{
      if (session === undefined ) {
        throw session;
      }
    })
    .catch(() => {
      return models.Sessions.create()
        .then((session) => {
          return models.Sessions.get({ id: session.insertId });
        })
        .tap((session) => {
          res.cookie('shortlyid', session.hash);
        });
    })
    .then((session) => {
      req.session = session;
      next();
    });
};


/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

