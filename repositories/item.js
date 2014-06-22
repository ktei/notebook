exports.findByTabId = function(db, tabId, callback) {
  callback(null, []);
};

exports.insert = function(db, callback) {
  var items = db.collection('items');
  items.insert({
    tab_id: params.tabId,
    title: params.title,
    content: params.content
  }, function(err, result) {
    if (callback) {
      callback(err, result);
    }
  });
};
