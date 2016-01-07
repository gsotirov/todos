'use strict';

var View = require('ampersand-view');

module.exports = View.extend({
	template: '<li class="todo clearfix relative"><input class="toggle pull-left check-completed" type="checkbox" data-hook="checkbox"/><span class="todo-title" data-hook="title"></span><a class="todo-delete absolute" data-hook="delete">X</a></li>',
	events: {
		'change [data-hook~=checkbox]': 'handleCheckCompleted',
		'click [data-hook~=delete]': 'handleTodoDelete'
	},
	render: function () {
		this.renderWithTemplate();
	},
	bindings: {
		'model.title': {
			type: 'text',
			hook: 'title'
		},
		'model.completed': [
			{
				type: 'booleanAttribute',
				name: 'checked',
				hook: 'checkbox'
			},
			{
				type: 'booleanClass'
			}
		]
	},
	handleCheckCompleted: function (ev) {
		this.model.completed = ev.target.checked;
	},
	handleTodoDelete: function () {
		this.model.destroy();
	}
});