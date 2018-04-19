const db = require('./models');

const task_list = [
	{
		task: "wash dish",
		description: "wash the damn dishes"
	},
	{
		task: "fold clothes",
		description: "fold the damn clothes"
	}


]

db.Todo.remove({}, function(err, tasks){
	if(err) {
		console.log('error occurred in remove', err);
	} else {
		console.log('removed all tasks');

		db.Todo.create(task_list, function(err, tasks){
			if (err) { return console.log('err', err); }
			console.log('created', tasks.length, 'tasks');
			process.exit();
		});
	}
});