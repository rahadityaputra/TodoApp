const express = require('express');
const app = express();
const  moment = require("moment"); 
const { fetchResults } = require("./config/database.js");

const ejs = require('ejs');
const { loadEnvFile } = require('process');

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
	res.render("index");
});

app.get('/ongoing',  async (req, res) => {
	const query = 'SELECT * FROM tasks';
	const tasks = await fetchResults(query);
	const tasksPending = tasks.filter((task => {
		return task.status == 'pending';
	}))
	res.render('ongoing', {tasksList : changeDateFormat(tasksPending)});
})

app.get('/completed',async (req, res) => {
	// res.send('ini halaman task yang sudah selesai');
	const query = 'SELECT * FROM tasks';
	const tasks = await fetchResults(query);
	const tasksCompleted = tasks.filter((task => {
		return task.status == 'completed';
	}))
	res.render('completed', {tasksList : changeDateFormat(tasksCompleted)});
})

function changeDateFormat(tasks) {
	return tasks.map((task) => {
			task.due_date_formated = moment(task.due_date).format("kk:mm DD/MM/YYYY"); 
			task.due_date = moment(task.due_date).format("YYYY-MM-DD hh:mm");
			return task;
		})
}

app.post('/add', (req, res) => {
	const { title, description, due_date } = req.body;
	const query = `INSERT INTO tasks VALUES (NULL, '${title}', '${description}', '${due_date}', 'pending', current_timestamp(), current_timestamp())`;
	const result = fetchResults(query);
	res.redirect("./ongoing");
})

app.post('/delete', (req, res) => {
	const { delete_task } = req.body;
	const query = `DELETE FROM tasks WHERE task_id = ${delete_task}`;
	const result = fetchResults(query);
	res.redirect("./ongoing");
})

app.post('/edit', (req, res) => {
	const { task_id, title, description, due_date } = req.body;
	const query = `UPDATE tasks SET title = '${title}', description = '${description}', due_date = '${due_date}' WHERE task_id = ${task_id};`;
	const result = fetchResults(query);
	res.redirect("./ongoing");
})

app.post('/complete', (req, res) => {
	const { complete_task } = req.body;
	const query = `UPDATE tasks SET status = 'completed' WHERE task_id = '${complete_task}';`;
	const result = fetchResults(query)
	res.redirect("./ongoing");
})


app.listen(3000);