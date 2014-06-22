var home = require('../controllers/home')
, tab = require('../controllers/tab')
, item = require('../controllers/item')
, folder = require('../controllers/folder')
, account = require('../controllers/account');

exports.setup = function(app) {
	app.get('/', restrict, home.index);
	app.post('/tabs', restrict, tab.store);
	app.get('/api/tabs', restrict, tab.fetchAll);
	app.get('/api/tabs/:id/items', restrict, item.fetchForTab)

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
