'use strict';

var State = require('ampersand-state');

module.exports = State.extend({
	props: {
		title: {
			type: 'string',
			default: ''
		},
		completed: {
			type: 'boolean',
			default: false
		}
	},
	destroy: function () {
		if (this.collection) {
			this.collection.remove(this);
		}
	}
});