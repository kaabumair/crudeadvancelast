const express = require('express');
const session = require('express-session');
const path = require('path');
const pool = require('./dbConn')
const TodoRepo = require('./repository/todorepository')
const TodoController = require('./controllers/todoController')
const CheckBasicToken = require('./middleware/testmiddleware')
const Validation = require('./middleware/testValidationmiddleware')
const todoController = new TodoController()
const TODO_BASE_ROUTE = '/'
const TODO_GET_TASKS = '/getall'
const TODO_AUTH_ROUTE = '/auth'
const TODO_DELETE_ROUTE = '/deletetask'
const port = 3000


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


app.use(express.static(path.join(__dirname, 'styles')));

//dasfads
app.get(TODO_BASE_ROUTE, function(request, response) {
	response.sendFile(path.join(__dirname + '/login.html'));
});

app.post(TODO_AUTH_ROUTE, todoController.BasicAuth)
	

app.post('/createuser', todoController.createUser)
app.post('/deleteuser', todoController.deleteUser)

app.post(TODO_BASE_ROUTE, CheckBasicToken, Validation, todoController.createTask)

app.get(TODO_GET_TASKS, todoController.getAll)

app.delete(TODO_DELETE_ROUTE, todoController.deleteTask)

app.put(TODO_BASE_ROUTE + '/update', todoController.UpdateTask)

app.put(TODO_BASE_ROUTE + '/updatedesc', todoController.UpdateDesc)

app.get(TODO_BASE_ROUTE + '/pending', todoController.TaskStatus)

// http://localhost:3000/auth



// http://localhost:3000/home
// app.get('/home', function(request, response) {
// 	// If the user is loggedin
// 	if (request.session.loggedin) {
// 		// Output username
// 		response.send('Welcome back, ' + request.session.username + '!');
// 	} else {
// 		// Not logged in
// 		response.send('Please login to view this page!');
// 	}
// 	response.end();
// }

app.listen(port, () => {
    console.log(`Example app listening on port ${3000}`)
  })