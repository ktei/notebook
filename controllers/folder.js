var async = require('async');
var S = require('string');
var ObjectId = require('mongodb').ObjectID;

exports.list = function(req, res) {
	var collection = req.db.collection('folders');
	collection.find().toArray(function(err, items) {
		res.render('folder/index', {
			title: 'Success!',
			folders: items
		});
	});
};

exports.show = function(req, res) {
	async.series(
		{
			folder: function(callback) {
				var collection = req.db.collection('folders');
				collection.findOne({ _id: new ObjectId(req.params.id) }, function(err, item) {
					callback(null, item);
				});
			},
			notes: function(callback) {
				var collection = req.db.collection('notes');
				collection.find().toArray(function(err, items) {
					callback(null, items);
				});
			}
		},
		function(err, results) {
			res.render('folder/show', { folder: results.folder, notes: results.notes });
		}
	);
};

exports.create = function(req, res) {
	res.render('folder/create');
};

exports.store = function(req, res, next) {
	var err = validateStore(req);
	if (err) {
		req.flash('error', err);
		res.render('folder/create');
	} else {
		var collection = req.db.collection('folders');
		collection.insert({ name: req.body.name }, function(err, result) {
			if (err) {
				throw err;
			} else {
				res.redirect('/folders');
			}
		});
	}
};

function validateStore(req) {
	name = S(req.body.name).trim().s;
	if (!name) {
		return 'Folder name cannot be empty.';
	}
	return '';
}
