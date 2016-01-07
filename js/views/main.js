'use strict';

var View = require('ampersand-view'),
		TodoView = require('./todo'),
		ENTER_KEY = 13;

module.exports = View.extend({
	
	events: {
		'keypress [data-hook=add-todo]': 'handleAddTodo',
		'click [data-hook~=clear]': 'clearCompleted',
		'click [data-hook~=todos-filter]': 'toggleFilterMenu',
		'click [data-hook=f-link]': 'handleFilterChange'
	},

	initialize: function () {
		this.cacheElements({
			addTodoInput: '[data-hook~=add-todo]',
			todosList: '[data-hook~=todos-list]',
			filtersList: '[data-hook~=filters-list]'
		});

		this.renderCollection(app.me.todos.subset, TodoView, this.todosList);
	},
	bindings: {
		'model.todosLeft': {
			type: 'innerHTML',
			hook: 'left-count'
		},
		'model.completedCount': {
			type: 'toggle',
			hook: 'clear-completed'
		},
		'model.mode': {
			type: 'switchClass',
			name: 'selected',
			cases: {
				all: '[data-hook=all-mode]',
				active: '[data-hook=active-mode]',
				completed: '[data-hook=completed-mode]'
			}
		},
	},
	handleAddTodo: function (e) {
		var todoTitle = this.addTodoInput.value.trim();
		if(e.which === ENTER_KEY && todoTitle) {
			app.me.todos.add({title: todoTitle});
			this.addTodoInput.value = '';
		}
	},
	clearCompleted: function () {
		app.me.todos.clearCompleted();
	},
	toggleFilterMenu: function (ev) {
		ev.preventDefault();
		this.toggleVisibility(this.filtersList);
	},

	toggleVisibility: function (target) {
		if (this.elementHasClass(target, 'hidden')) {
			target.classList.remove('hidden');
			target.classList.add('visible');
		} 
		else if (this.elementHasClass(target, 'visible')) {
			target.classList.remove('visible');
			target.classList.add('hidden');
		}
		else {
			return;
		}
	},
	elementHasClass: function (el, cls) {
    	return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') >= 0;
	},
	handleFilterChange: function (ev) {
		var target = ev.target,
				filter = target.dataset['filter'];

		this.toggleVisibility(this.filtersList);
		this.model.mode = filter;
	}
});










