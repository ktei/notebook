process.env.NODE_ENV= 'development';
console.log(process.env.NODE_ENV);

var express = require('express')
, routes = require('./routes')
, user = require('./routes/user')
, account = require('./routes/account')
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
	app.use(app.router);
	app.use(lessMiddleware(path.join(__dirname, 'public')));
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(express.static(path.join(__dirname, 'bower_components')));
});

app.configure('development', function() {
	app.set('db_conn_str', 'mongodb://localhost:27017/notebook');
	app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/login', account.login);
app.get('/logout', account.logout);

function restrict(req, res, next) {
	if (req.session.user) {
		next();
	} else {
		req.session.error = 'Access denied!';
		res.redirect('/login');
	}
}

var MongoClient = require('mongodb').MongoClient;
// Initialize connection once
console.log(app.get('db_conn_str'));
MongoClient.connect(app.get('db_conn_str'), function(err, database) {
	if(err) throw err;
	//db = database;
	app.use(function(req, res, next) {
	    req.db = database;
	    next();
	});

  	// Start the application after the database connection is ready
	http.createServer(app).listen(app.get('port'), function() {
		console.log("Express server listening on port " + app.get('port'));
	});
});

