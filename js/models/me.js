'use strict';

var State = require('ampersand-state');
var Todos = require('./todos');

module.exports = State.extend({
	initialize: function () {

		this.listenTo(this.todos, 'change:completed add remove', this.updateTodos);
		
		this.updateTodos();

		this.listenTo(this, 'change:mode', this.handleModeChange);
	},
	collections: {
		todos: Todos
	},
	session: {
		totalCount: {
			type: 'number',
			default: 0
		},
		activeCount: {
			type: 'number',
			default: 0
		},
		completedCount: {
			type: 'number',
			default: 0
		},
		allCompleted: {
			type: 'boolean',
			default: false
		},
		mode: {
			type: 'string',
			values: [
				'all',
				'completed',
				'active'
			],
			default: 'all'
		}
	},
	derived: {
		todosLeft: {
			deps: ['activeCount'],
			fn: function () {
				var singular = ' item left',
					plural = ' items left';

				return (this.activeCount === 1) ? this.activeCount + singular : this.activeCount + plural;
			}
		}
	},
	updateTodos: function () {

		var total = this.todos.length;
		var completed = this.todos.getCompletedCount();

		this.set({
			totalCount: total,
			activeCount: total - completed,
			completedCount: completed,
			allCompleted: total === completed
		});

	},
	handleModeChange: function (ev) {
		console.log(ev);
		this.todos.setMode(this.mode);
	}
});






