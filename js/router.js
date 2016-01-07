'use strict';

var Router = require('ampersand-router');

module.exports = Router.extend({
	routes: {
		'*filter': 'setFilter'
	},
	setFilter: function (arg) {
		app.me.mode = arg || 'all';
	}
});