console.log('app.js linked');
var $todosList;
var allTodos = [];

$(document).ready(function(){
	$todosList = $('#todoTarget');
	$.ajax({
		method: 'GET',
		url: '/api/v1/todos',
		success: handleSuccess,
		error: handleError
	});

	$('#newTodoForm').on('submit', function(e) {
		//  
		$.ajax({
			method: 'POST',
			url: '/api/v1/todos',
			data: $(this).serialize(),
			success: newTodoSuccess,
			error: newTodoError
		});
	});
	$todosList.on('click', '.deleteBtn', function() {
		console.log('clicked delete button to', '/api/v1/todos/'+$(this).attr('data-id'));
		$.ajax({
			method: 'DELETE',
			url: '/api/v1/todos/'+$(this).attr('data-id'),
			success: deleteTodoSuccess,
			error: deleteTodoError
		})
	})
});

function getTodoHtml(todo) {
  return `<hr>
          <p>
            <b>${todo.task}</b>
            by ${todo.description}
            <button type="button" name="button" class="deleteBtn btn btn-danger pull-right" data-id=${todo._id}>Delete</button>
          </p>`;
};

function getAllTodosHtml(todos) {
	return todos.map(getTodoHtml).join("");
};

function render () {
	$todosList.empty();
	var todosHtml = getAllTodosHtml(allTodos);
	$todosList.append(todosHtml);
};

function handleSuccess(json) {
	allTodos = json;
	render();
};

function handleError(e) {
	console.log('handleError');
	$('#todoTarget').text('failed to load todos, is server working');
};

function newTodoSuccess(json) {
	$('#newTodoForm input').val('');
	allTodos.push(json);
	console.log('newTodoSuccess');
	render();
};

function newTodoError() {
	console.log('newTodo error!');
};

function deleteTodoSuccess(json) {
	var todo = json;
	console.log(json);
	var todoId = todo._id;
	console.log('delete todo', todoId);

	for(var index = 0; index < allTodos.length; index++) {
		if(allTodos[index]._id === todoId) {
			allTodos.splice(index, 1);
			break;
		}
	}
	render();
};

function deleteTodoError() {
	console.log('deleteTodo error!');
};
// functions to make 

// on document load
// handleSuccess
// handleError

// on form submit
// newTodoSuccess
// newTodoError

// on deletion
// deleteTodoSuccess
// deleteTodoError