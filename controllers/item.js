var items = require('../repositories/item');

exports.fetchForTab = function(req, res, next) {
  items.findByTabId(req.db,
    { tab_id: req.params.id },
    function(err, items) {
      if (err) {
        res.jsonError();
      } else {
        res.jsonSuccess(items);
      }
    }
  );
};
