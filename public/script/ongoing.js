// const {clickElement} = require('./function.js');
import { clickElement } from "./function.js";

document.body.addEventListener("click", clickElement);

// menentukan manimal datetime saat input task
function toLocalISOString(date) {
	// Dapatkan komponen tanggal dan waktu
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");

	// Buat string dalam format ISO 8601 dengan zona waktu lokal
	const localISOString = `${year}-${month}-${day}T${hours}:${minutes}`;

	return localISOString;
}

function getMinInputDate() {
	const minDate = new Date();
	return toLocalISOString(minDate);
}

const dateTimeInput = document.querySelector("#task-input #due-date");
const dateTimeEdits = document.querySelectorAll(".due-date-edit");
dateTimeInput.min = getMinInputDate();
dateTimeEdits.forEach((dateTimeEdit) => {
	dateTimeEdit.min = getMinInputDate();
});

const main = document.querySelector('main');
const tasks = JSON.parse(main.dataset.tasks);

console.log(tasks);
const listWrapper = document.querySelector('.task-list ul');

function createList(id, title, description, status, due_date) {
	const list = `<li class="task-item d-flex col col-12 justify-content-between align-items-center ">
                	<span class="task-title">${title}</span>
									<div class="task-action d-flex">
										<form action="/complete" method="post">
											<button class="btn btn-outline-success " type="submit" value="${id}" name="complete_task" id="flexCheckIndeterminate">
											<i class="bi bi-check-lg"></i>
											</button>
										</form>
										<div>
										<button class="task-detail-btn btn btn-info" name="task_detail"
										value="${id}" data-title="${title}" data-description ="${description}" data-status = "${status}" data-due_date = "${due_date}" data-bs-toggle="modal" data-bs-target="#task-detail-modal">
											<i class="bi bi-info-circle" style="color: white;"></i>
										</button>
										</div>
									</div>
								</li>`;

	listWrapper.innerHTML += list;
}

tasks.forEach(task => {
	const {task_id, title, description, status, due_date} = task;
	createList(task_id, title, description, status, due_date);

})

const sortOptions = document.querySelector(".form-select");
console.log(sortOptions);
sortOptions.addEventListener('click', function () {
	const number = this.value;
	switch (number) {
		case '1':
			tasks.sort((a,b) => {
				const firsTask = a.title.trim();
				const nextTask = b.title.trim();

				if (firsTask < nextTask) {
					return -1
				} else {
					return 1;
				}
			})	
				break;
		case '2': 
			tasks.sort((a, b) => {
				const firsTask = a.title.trim();
				const nextTask = b.title.trim();

				if (firsTask > nextTask) {
					return -1;
				} else {
					return 1;
				}
			});	
				break;
			default:
				break;
			}
			listWrapper.innerHTML = '';
			tasks.forEach((task) => {
				const { task_id, title, description, status, due_date } = task;
				createList(task_id, title, description, status, due_date);
			});
		})
