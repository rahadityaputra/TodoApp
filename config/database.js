const mysql = require("mysql");

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "todo_db",
});

connection.connect((error) => {
	if (error) 
		throw error;
});


 function fetchResults(query) {
	return new Promise((resolve, rejected) => {
		connection.query(query, (error, result) => {
			if (error) {
				rejected(error);
			}
			const resultQuery = JSON.parse(JSON.stringify(result));
			resolve(resultQuery);
		});
	});
}

module.exports = {fetchResults};
