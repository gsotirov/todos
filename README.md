# todos

Simple TODO tasks app made with AmpersandJS.

Features:

  - Create Todos instantly with on key press;
  - Edit Todos (still under dev);
  - Delete Todos with on click;
  - Tasks can be sorted using the Filters -> All, Active, Completed;
  - Option to clear all completed task at once.

Models:
  - Me - that's the main model that takes care of the main page;
  - Todo - takes care of a Todo's properties and methods;
  - Todos - a collection of Todos. It handles the interactions that are made with all todos. It saves the data to the LocalStorage.

Views: 
  - Main - binds the main model to the html so everything is updated accordingly;
  - Todo - binds the Todo model to the html responsible for rendering a single Todo.