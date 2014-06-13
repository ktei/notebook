exports.setup = function(app) {
	app.use(function(req, res, next){
		var err = req.session.error;
		var msg = req.session.success;
		delete req.session.error;
		delete req.session.success;
		res.locals.message = '';
		if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
		if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
		next();
	});
};

var users = {
	ktei: { name: 'ktei' }
};

// when you create a user, generate a salt
// and hash the password ('ktei' is the pass here)
hash('blizzard', function(err, salt, hash){
	if (err) throw err;
  	// store the salt & hash in the "db"
  	users.ktei.salt = salt;
  	users.ktei.hash = hash;
});

// Authenticate using our plain-object database of doom!
function authenticate(name, pass, fn) {
	if (!module.parent) console.log('authenticating %s:%s', name, pass);
	var user = users[name];
  	// query the db for the given username
	if (!user) return fn(new Error('cannot find user'));
  	// apply the same algorithm to the POSTed password, applying
  	// the hash against the pass / salt, if there is a match we
  	// found the user
	hash(pass, user.salt, function(err, hash){
	  	if (err) return fn(err);
	  	if (hash == user.hash) return fn(null, user);
	  	fn(new Error('invalid password'));
	});
}