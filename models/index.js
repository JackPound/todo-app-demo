const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/todo-app-demo')

if (process.env.NODE_ENV == "production") {
  mongoose.connect(process.env.MLAB_URL)
} else {
  mongoose.connect("mongodb://localhost/todo-app-demo");
}

module.exports.Todo = require('./todo.js');