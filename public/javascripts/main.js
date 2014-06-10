requirejs.config({
	paths: {
		'jquery': '../jquery/jquery',
		'bootstrap': '../bootstrap/dist/js/bootstrap.min',
	},
    shim: {
    	'bootstrap': ['jquery']
    }
});

requirejs(['require', 'jquery', 'bootstrap'], function(require) {
	
});