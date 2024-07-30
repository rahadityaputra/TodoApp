function showDetailModal(id, title, description, status, due_date) {
	const modalContent = document.querySelector("#task-detail-modal .modal-content");
	const content = `<div class="modal-header">
							<h1 class="modal-title fs-5" id="exampleModalLabel">${title}</h1>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
								<p><strong>Description:</strong> <span id="modalTaskDescription">${description}</span></p>
								<p><strong>Status:</strong> <span id="modalTaskStatus">${status}</span></p>
								<p><strong>Due Date:</strong> <span id="modalTaskDueDate">${due_date}</span></p>
						</div>
						<div class="modal-footer">
						${
							status !== "completed"
								? `<button class="task-edit-btn btn btn-warning m-1" data-bs-toggle="modal"
								data-bs-target="#task-edit-modal" value="${id}" data-title="${title}" data-description = "${description}"  data-due_date = "${due_date}">Edit</button>`
								: ""
						}
							<form action="/delete" method="post">
								<button class="delete-btn btn btn-danger m-1" name="delete_task" type="button"
									value="${id}" data-bs-toggle="modal"
									data-bs-target="#delete-modal">Delete</button>
							</form>
							${
								status !== "completed"
									? `<form action="/complete" method="post">
								<button class="btn m-1 btn-success " type="submit" name="complete_task" value="${id}">Mark as
									Complete</button>
							</form>`
									: ``
							}
							
						</div>`;

	modalContent.innerHTML = content;
}

function showEditModal(id, title, description, status, due_date) {
	const modalContent = document.querySelector("#task-edit-modal .modal-content");
	const content = ` <div class="modal-header">
          						<h1 class="modal-title fs-5" id="exampleModalLabel">Edit Yout Task</h1>
										</div>
										<div class="modal-body">
											<form action="/edit" method="post">
												<input type="text" name="task_id" value="${id}" style="display: none;">
												<div class="mb-3">
													<label for="input-title" class="form-label">Task's Title</label>
													<input type="text" class="form-control" id="input-title" placeholder="Learn Javascript" name="title"
														value="${title}" required autofocus>
												</div>
												<div class="mb-3">
													<label for="input-description" class="form-label">Task's Description </label>
													<textarea class="form-control" id="input-description" rows="3" placeholder="Learn Javascript on YouTube"
														name="description">${description}</textarea>
												</div>
												<div class="mb-3">
													<label for="due-date-edit" class="form-label">Due Date</label>
													<input type="datetime-local" id="due-date-edit" name="due_date" class="form-control due-date-edit"
														value="${due_date}">
												</div>
												<div class="modal-footer">
													<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
													<button type="submit" class="btn btn-primary">Update Task</button>
												</div>
											</form>
										</div>`;
	modalContent.innerHTML = content;
}

export function clickElement(event) {
	const element = event.target;
	const deleteConfirmButton = document.querySelector(".delete-confirm-btn");
	if (element.classList.contains("delete-btn")) {
		deleteConfirmButton.value = element.value;
	} else if (element.classList.contains("task-detail-btn")) {
		const task_id = element.value;
		const title = element.dataset.title;
		const description = element.dataset.description;
		const status = element.dataset.status;
		const due_date = element.dataset.due_date;
		showDetailModal(task_id, title, description, status, due_date);
	} else if (element.classList.contains("task-edit-btn")) {
		console.log("ini tombol edit");
		const task_id = element.value;
		const title = element.dataset.title;
		const description = element.dataset.description;
		const status = element.dataset.status;
		const due_date = element.dataset.due_date;
		showEditModal(task_id, title, description, status, due_date);
	}
}
