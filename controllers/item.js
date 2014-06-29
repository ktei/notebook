var items = require('../repositories/item');
var S = require('string');
var ObjectId = require('mongodb').ObjectID;
var extend = require('extend');

exports.fetchForTab = function(req, res) {
  items.findByTabId(req.db,
    req.params.tabId,
    function(err, items) {
      if (err) {
        res.jsonError();
      } else {
        res.jsonSuccess(items);
      }
    }
  );
};

exports.create = function(req, res) {
  res.render('item/create', {
    title: '',
    content: '',
    backUrl: '/tabs/' + req.params.tabId
  });
};

exports.store = function(req, res) {
  var err = validateItem(req);
  if (err) {
    req.flash('error', err);
    res.render('item/create');
  } else {
    items.insert(req.db, {
      tab_id: new ObjectId(req.params.tabId),
      title: req.body.title,
      content: req.body.content
    }, function(err, result) {
      if (err) {
        throw err;
      } else {
        req.flash('success', 'New item has been successfully created.');
        res.redirect('/tabs/' + req.params.tabId);
      }
    });
  }
};

exports.edit = function(req, res) {
  items.findById(req.db, req.params.id, function(err, item) {
    if (err) {
      throw err;
    } else {
      res.render('item/edit', extend(item, {
          backUrl: '/tabs/' + req.params.tabId
        })
      );
    }
  });
};

exports.update = function(req, res) {
  var err = validateItem(req);
  if (err) {
    req.flash('error', err);
    res.render('item/edit', {
      title: req.body.item,
      content: req.body.content
    });
    return;
  }
  items.update(req.db,
    {
      id: req.params.id,
      title: req.body.title,
      content: req.body.content
    },
    function(err, result) {
      if (err) {
        throw err;
      } else {
        res.redirect('/tabs/' + req.params.tabId);
      }
    }
  );
};

function validateItem(req) {
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

exports.delete = function(req, res) {
  items.delete(req.db, req.params.id, function(err, result) {
    if (err) {
      throw err;
    } else {
      res.redirect('/tabs/' + req.params.tabId);
    }
  });
};
