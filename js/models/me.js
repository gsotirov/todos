'use strict';

var State = require('ampersand-state'),
		Todos = require('./todos');

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
				'active',
				'completed'
			],
			default: 'all'
		}
	},
	derived: {
		todosLeft: {
			deps: ['activeCount', 'mode'],
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
			allCompleted: total === completed,
		});
	},
	handleModeChange: function (ev) {
		this.todos.setFilter(this.mode);
	}
});






