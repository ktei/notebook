var items = require('../repositories/item');
var S = require('string');
var ObjectId = require('mongodb').ObjectID;

exports.create = function(req, res) {
  res.render('item/create');
};

exports.store = function(req, res) {
  var err = validateStore(req);
  if (err) {
    req.flash('error', err);
    res.render('item/create');
  } else {
    items.insert(req.db, {
      tab_id: new ObjectId(req.params.id),
      title: req.body.title,
      content: req.body.content
    }, function(err, result) {
      if (err) {
        throw err;
      } else {
        req.flash('success', 'New item has been successfully created.');
        res.redirect('/tabs/' + req.params.id);
      }
    });
  }
};

exports.fetchForTab = function(req, res) {
  items.findByTabId(req.db,
    req.params.id,
    function(err, items) {
      if (err) {
        res.jsonError();
      } else {
        res.jsonSuccess(items);
      }
    }
  );
};

function validateStore(req) {
  title = S(req.body.title).trim().s;
  if (!title) {
    return 'Title name cannot be empty.';
  }
  content = S(req.body.content).trim().s;
  if (!content) {
    return 'Content cannot be empty.';
  }
  return '';
}
