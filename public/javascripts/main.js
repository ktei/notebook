requirejs.config({
	paths: {
		'jquery': '/jquery/jquery',
		'knockout': '/knockoutjs/dist/knockout',
		'bootstrap': '/bootstrap/dist/js/bootstrap.min',
		'markdown': '/markdown/lib/markdown',
		'to-markdown': '/to-markdown/src/to-markdown',
		'bootstrap-markdown': '/bootstrap-markdown/js/bootstrap-markdown',
		'home': '/javascripts/home'
	},
    shim: {
    	'bootstrap': ['jquery'],
			'bootstrap-markdown': ['markdown', 'to-markdown']
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
