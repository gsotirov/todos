'use strict';

var MainView = require('./views/main');
var Me = require('./models/me');
// var Router = require('./router');

window.app = {
	init: function () {

		// Create and attch the main app model...
		this.me = new Me();

		// Create and attach the main app view...
		this.view = new MainView({
			el: document.body,
			model: this.me
		});

		// Create and fire up the router(we'll leave it for now...)
		// this.router = new Router();
		// this.router.history.start();
	}
};

window.app.init();