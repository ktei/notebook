

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
