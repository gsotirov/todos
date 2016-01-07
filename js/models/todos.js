'use strict';

var Collection = require('ampersand-collection'),
		SubCollection = require('ampersand-subcollection'),
		Todo = require('./todo'),
		STORAGE_KEY = 'todos',
		debounce = require('debounce');

module.exports = Collection.extend({
	// Attach the collection model.
	model: Todo,
	// Attach some listeners and initial settings.
	initialize: function () {
		// Attempt to read from the storage to get the current TODOs.
		this.readFromStorage();
		// Create a subset to easily apply filters...
		this.subset = new SubCollection(this);
		// Make a little debounce to prevent bugs.
		this.writeToStorage = debounce(this.writeToStorage, 100);
		// Listen to storage changes.
		window.addEventListener('storage', this.handleStorageEvent.bind(this));
		// Listen for collection changes and write the changes to the storage.
		this.on('all', this.writeToStorage, this);
	},
	// Get the total TODOs count so the main model can display them properly.
	getCompletedCount: function () {
		return this.reduce(function (total, todo) {
			return todo.completed ? ++total : total;
		}, 0);
	},
	clearCompleted: function () {
		var todosToRemove = this.filter(function (todo) {
			return todo.completed;
		});
		this.remove(todosToRemove);
	},
	setFilter: function (filter) {
		if (filter === 'all') {
			this.subset.clearFilters();
		} 
		else {
			this.subset.configure({
				where: {
					completed: filter === 'completed'
				}
			}, true);
		}
	},
	writeToStorage: function () {
		localStorage[STORAGE_KEY] = JSON.stringify(this);
	},
	// Get TODOs from the storage.
	readFromStorage: function () {
		var records = localStorage[STORAGE_KEY];
		if(records) {
			this.set(JSON.parse(records));
		}
	},
	// Handles events from localStorage. Browsers will fire
	// this event in other tabs on the same domain.
	handleStorageEvent: function (e) {
		if (e.key === STORAGE_KEY) {
			this.readFromLocalStorage();
		}
	}
});