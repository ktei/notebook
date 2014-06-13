exports.index = function(req, res) {
	console.log(req.db);
	res.render('index', { title: 'Success!' });
};