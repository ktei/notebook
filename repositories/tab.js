var async = require('async');
var ObjectId = require('mongodb').ObjectID;

exports.insert = function(db, params, callback) {
  var tabs = db.collection('tabs');
  tabs.insert({ name: params.name }, function(err, result) {
    if (callback) {
      callback(err, result);
    }
  });
};

exports.findAll = function(db, callback) {
  var tabs = db.collection('tabs');
  tabs.find().toArray(function(err, items) {
    callback(null, items);
  });
};

exports.delete = function(db, id, callback) {
  async.series(
    {
      itemsResult: function(callback) {
        var items = db.collection('items');
        items.remove({ tab_id: new ObjectId(id) }, function(err, result) {
          callback(null, { err: err, result: result });
        })
      },
      tabsResult: function(callback) {
        var tabs = db.collection('tabs');
        tabs.remove({ _id: new ObjectId(id) }, function(err, result) {
          callback(null, { err: err, result: result });
        });
      }
    },
    function(err, results) {
      var err = null;
      if (results.itemsResult.err) {
        err = results.itemsResult.err;
      }
      if (results.tabsResult.err) {
        err = results.tabsResult.err;
      }
      if (callback) {
        callback(err, results.tabsResult.result);
      }
    }
  );
};
