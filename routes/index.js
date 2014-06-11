
/*
 * GET home page.
 */

 exports.index = function(req, res) {
 	var db = require('mongodb').MongoClient;
 	db.connect("mongodb://localhost:27017/WorkMemo", function(err, db) {
 		if (!err) {
 			res.render('index', { title: 'Success!' });
 		} else {
 			res.render('index', { title: 'Failure!' });
 		}
 	});
 	
 };