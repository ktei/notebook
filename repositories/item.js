var ObjectId = require('mongodb').ObjectID;

exports.findByTabId = function(db, tabId, callback) {
  var items = db.collection('items');
  items.ensureIndex('tab_id', function() {
    items.find({ tab_id: new ObjectId(tabId) })
      .toArray(function(err, items) {
        if (callback) {
          callback(err, items);
        }
      });
  })
};

exports.findById = function(db, id, callback) {
  var items = db.collection('items');
  items.findOne({ _id: new ObjectId(id) }, function(err, item) {
    if (callback) {
      callback(err, item);
    }
  })
}

exports.insert = function(db, params, callback) {
  var items = db.collection('items');
  items.insert(params, function(err, result) {
    if (callback) {
      callback(err, result);
    }
  });
};

exports.update = function(db, params, callback) {
  var items = db.collection('items');
  items.update({ _id: new ObjectId(params.id) },
    {$set: {
      title: params.title,
      content: params.content
    }}, function(err, result) {
    if (callback) {
      callback(err, result);
    }
  })
};

exports.delete = function(db, id, callback) {
  var items = db.collection('items');
  items.remove({ _id: new ObjectId(id) }, function(err, result) {
    if (callback) {
      callback(err, result);
    }
  });
};
