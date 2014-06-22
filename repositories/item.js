var ObjectId = require('mongodb').ObjectID;

exports.findByTabId = function(db, tabId, callback) {
  var items = db.collection('items');
  items.ensureIndex('tab_id', function() {
    items.find({ tab_id: new ObjectId(tabId) })
      .toArray(function(err, items) {
        callback(err, items);
      });
  })
};

exports.insert = function(db, params, callback) {
  var items = db.collection('items');
  items.insert(params, function(err, result) {
    if (callback) {
      callback(err, result);
    }
  });
};
