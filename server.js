// require database
const db       = require('./models');
//require express
const express  = require('express'), 
   bodyParser  = require('body-parser');
const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/todo-app-demo');
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
// port being used
const port = 3000;
// server static files from public directory
app.use(express.static('public'));



app.get('/', function (req, res) {
	res.render('index', {root: __dirname});
});

app.get('/api/v1/todos', function(req, res) {
	db.Todo.find(function(err, todos) {
		if (err) {
			console.log('index error: ' + err);
			res.sendStatus(500);
		}
		res.json(todos);
	})
});

app.get('/api/v1/todos/:id', function (req, res) {
	db.Todo.find(function(err, todos) {
	  for(var i=0; i < todos.length; i++) {
	    if (todos[i]._id == req.params.id) {
	      res.json(todos[i]);
	      break; 
	    }
	  }		
	})
});

app.delete('/api/v1/todos/:id', function (req, res) {
	var todoId = req.params.id;
	db.Todo.findOneAndRemove({ _id: todoId }, function (err, deletedTodo) {
		res.json(deletedTodo);
	});
})

app.post('/api/v1/todos', function (req, res) {
	var newTodo = req.body;
	db.Todo.create(req.body, function(err, besttodo) {
		res.redirect('/')
	})
});

// app.post('/api/v1/todos', function (req, res) {
// 	db.Todo.find(function(err, todos){
// 		var newTodo = req.body;
// 		todos.push(newTodo);
// 		res.json(newTodo);
// 	})
// })

app.set('port', process.env.PORT || 3001)

app.listen(app.get('port'), () => {
console.log(`✅ PORT: ${app.get('port')} 🌟`)
})
// using port
// app.listen(port, ()=> {
//   console.log(`Still listening on port ${port}`);
// });