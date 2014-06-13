var folder = require('../routes/folder')
, account = require('../routes/account');

exports.setup = function(app) {
	app.get('/', restrict, folder.list);
	app.get('/folders/:id', restrict, folder.show);
	app.get('/folders/create', restrict, folder.create);
	app.get('/folders', restrict, folder.list);
	app.post('/folders', restrict, folder.store);
	app.get('/login', account.loginGet);
	app.post('/login', account.loginPost);
	app.get('/logout', account.logout);

	function restrict(req, res, next) {
		if (req.session.user) {
			next();
		} else {
			req.session.returnUrl = req.path;
			res.redirect('/login');
		}
	}
};