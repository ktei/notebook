var async = require('async');
var S = require('string');
var ObjectId = require('mongodb').ObjectID;
var tabs = require('../repositories/tab');

exports.store = function(req, res, next) {
  var err = validateStore(req);
  if (err) {
    req.flash('error', err);
    res.render('home/index');
  } else {
    tabs.insert(req.db,
      { name: req.body.name },
      function(err, result) {
        if (err) {
          throw err;
        } else {
          res.redirect('/');
        }
      }
    );
  }
};

exports.fetchAll = function(req, res, next) {
  tabs.findAll(req.db, function(err, items) {
    if (err) {
      res.jsonError();
    } else {
      res.jsonSuccess(items);
    }
  });
};

function validateStore(req) {
  name = S(req.body.name).trim().s;
  if (!name) {
    return 'Folder name cannot be empty.';
  }
  return '';
}
