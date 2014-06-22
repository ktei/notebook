process.env.NODE_ENV= 'development';
console.log(process.env.NODE_ENV);

var express = require('express')
, flash = require('express-flash')
, routes = require('./bootstrap/routes')
, http = require('http')
, path = require('path')
, lessMiddleware = require('less-middleware')
, mongo = require('mongodb');

var app = express();

app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.set('db_conn_str', 'mongodb://ktei@ds041248.mongolab.com:41248/notebook');
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('km5jpVEi'));
	app.use(express.session());
	app.use(flash());

	app.use(function(req, res, next) {
		req.db = db;
		if (req.session.user) {
			res.locals.user = req.session.user;
			res.locals.authenticted = true;
		}
		next();
	});
	app.use(function(req, res, next) {
		res.jsonSuccess = function(data) {
			return res.json({
				'success': true,
				'data': data
			});
		};
		res.jsonError = function(message) {
			return res.json({
				'success': false,
				'message': message ? message : 'Internal server error'
			});
		};
		next();
	});

	app.use(app.router);
	app.use(lessMiddleware(path.join(__dirname, 'public')));
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(express.static(path.join(__dirname, 'bower_components')));
});

app.configure('development', function() {
	app.set('db_conn_str', 'mongodb://localhost:27017/notebook');
	app.use(express.errorHandler());
});

routes.setup(app);

var MongoClient = require('mongodb').MongoClient;
var db;

// Initialize connection once
console.log(app.get('db_conn_str'));
MongoClient.connect(app.get('db_conn_str'), function(err, database) {
	if(err) {
		throw err;
	}
	db = database;

	// Start the application after the database connection is ready
	http.createServer(app).listen(app.get('port'), function() {
		console.log("Express server listening on port " + app.get('port'));
	});
});
