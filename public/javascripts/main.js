requirejs.config({
	paths: {
		'jquery': '/jquery/jquery',
		'knockout': '/knockoutjs/dist/knockout',
		'bootstrap': '/bootstrap/dist/js/bootstrap.min',
		'markdown': '/markdown/lib/markdown',
		'to-markdown': '/to-markdown/src/to-markdown',
		'bootstrap-markdown': '/bootstrap-markdown/js/bootstrap-markdown',
		'bootbox': '/bootbox/bootbox',
		'home': '/javascripts/home'
	},
    shim: {
    	'bootstrap': ['jquery'],
			'bootstrap-markdown': ['markdown', 'to-markdown'],
			'bootbox': ['bootstrap']
    }
});

requirejs(['require', 'jquery', 'bootstrap'], function(require) {
	var $ = require('jquery');

	var browserSupportsCSSProperty = function(propertyName) {
	  var elm = document.createElement('div');
	  propertyName = propertyName.toLowerCase();

	  if (elm.style[propertyName] != undefined)
	    return true;

	  var propertyNameCapital = propertyName.charAt(0).toUpperCase() + propertyName.substr(1),
	    domPrefixes = 'Webkit Moz ms O'.split(' ');

	  for (var i = 0; i < domPrefixes.length; i++) {
	    if (elm.style[domPrefixes[i] + propertyNameCapital] != undefined)
	      return true;
	  }

	  return false;
	};

	$(function() {
		$('.modal').on('shown.bs.modal', function() {
			$(this).find('[autofocus]').focus();
		});

		if (!browserSupportsCSSProperty('animation')) {
			$('.spinner').html('<p>Loading...</p>')
		}
	});
});
