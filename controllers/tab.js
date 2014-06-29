var async = require('async');
var S = require('string');
var ObjectId = require('mongodb').ObjectID;
var tabs = require('../repositories/tab');

exports.store = function(req, res, next) {
  var err = validateTab(req);
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
          console.log(result);
          res.redirect('/tabs/' + result[0]._id);
        }
      }
    );
  }
};

exports.fetchAll = function(req, res) {
  tabs.findAll(req.db, function(err, items) {
    if (err) {
      res.jsonError();
    } else {
      res.jsonSuccess(items);
    }
  });
};

function validateTab(req) {
  name = S(req.body.name).trim().s;
  if (!name) {
    return 'Folder name cannot be empty.';
  }
  return '';
}

exports.delete = function(req, res) {
  tabs.delete(req.db, req.params.id, function(err, result) {
    if (err) {
      throw err;
    } else {
      res.redirect('/');
    }
  })
};
