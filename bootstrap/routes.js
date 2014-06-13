var routes = require('../routes')
, user = require('../routes/user')
, account = require('../routes/account');

exports.setup = function(app) {
	app.get('/', restrict, routes.index);
	app.get('/users', restrict, user.list);
	app.get('/login', account.loginGet);
	app.post('/login', account.loginPost);
	app.get('/logout', account.logout);

	function restrict(req, res, next) {
		if (req.session.user) {
			next();
		} else {
			req.session.returnUrl = req.path;
			req.session.error = 'Access denied!';
			res.redirect('/login');
		}
	}
};