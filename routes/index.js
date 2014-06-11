
/*
 * GET home page.
 */

 exports.index = function(req, res) {
 	var db = require('mongodb').MongoClient;
 	db.connect("mongodb://ktei@ds041248.mongolab.com:41248/notebook", function(err, db) {
 		if (!err) {
 			res.render('index', { title: 'Success!' });
 		} else {
 			res.render('index', { title: 'Failure!', error: err });
 		}
 	});
 	
 };