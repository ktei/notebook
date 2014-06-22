requirejs.config({
	paths: {
		'home': '../javascripts/home',
		'jquery': '../jquery/jquery',
		'knockout': '../knockoutjs/dist/knockout',
		'bootstrap': '../bootstrap/dist/js/bootstrap.min'
	},
    shim: {
    	'bootstrap': ['jquery']
    }
});

requirejs(['require', 'jquery', 'bootstrap'], function(require) {
	var $ = require('jquery');
	$(function() {
		$('.modal').on('shown.bs.modal', function() {
			$(this).find('[autofocus]').focus();
		});
	});
});
