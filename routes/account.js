var hash = require('./pass').hash;

exports.loginGet = function(req, res) {
	res.render('account/login');
};

exports.loginPost = function(req, res) {
	authenticate(req.body.username, req.body.password, function(err, user) {
		if (user) {
			var returnUrl = req.session.returnUrl ? req.session.returnUrl : '/';
			req.session.regenerate(function() {
				req.session.user = user;
				res.redirect(returnUrl);
			});
		} else {
			req.flash('error', 'Access deined! Check your username and password please.');
			res.redirect('/login');
		}
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
	if (!user) { 
		return fn(new Error('cannot find user'));
	}
  	// apply the same algorithm to the POSTed password, applying
  	// the hash against the pass / salt, if there is a match we
  	// found the user
	hash(pass, user.salt, function(err, hash){
	  	if (err) { 
	  		return fn(err);
	  	}
	  	if (hash == user.hash) { 
	  		return fn(null, user);
	  	}
	  	fn(new Error('invalid password'));
	});
}

exports.logout = function(req, res) {
	req.session.destroy(function() {
    	res.redirect('/');
  	});
};