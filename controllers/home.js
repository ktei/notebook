exports.index = function(req, res) {
  if (req.params.id) {
    res.render('home/index', { activeTabId: req.params.id });
  } else {
    res.render('home/index');
  }
};
