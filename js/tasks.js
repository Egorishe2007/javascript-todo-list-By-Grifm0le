function addTask() {
    const title = taskInput.value.trim();

    if (!title) {
        alert("Введите задачу");
        return;
    }

    const task = {
        id: Date.now(),
        title,
        deadline: deadlineInput.value,
        priority: priorityInput.value,
        category: categoryInput.value,
        completed: false
    };

    tasks.push(task);

    renderTasks();
    saveTasks();

    taskInput.value = "";
    deadlineInput.value = "";
}
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);

    renderTasks();
    saveTasks();
}
function editTask(id) {

    const task =
        tasks.find(task => task.id === id);

    if (!task) {
        return;
    }

    editingTaskId = id;

    editTaskInput.value = task.title;

    editModal.classList.add("show");
}
function toggleTask(id) {
    const task = tasks.find(task => task.id === id);

    if (task) {
        task.completed = !task.completed;
    }

    renderTasks();
    saveTasks();
}
function renderTasks() {

    taskList.innerHTML = "";

    filterTasks(tasks)
        .forEach(task => {

            const li =
                document.createElement("li");

            li.className =
                `task-item priority-${task.priority}`;

            li.innerHTML = `
                <div>
                    <h3>${task.title}</h3>
                    <p>Приоритет: ${task.priority}</p>
                    <p>Категория: ${task.category}</p>
                    <p>Дедлайн: ${
                        task.deadline ||
                        "Не указан"
                    }</p>
                </div>

                <div>
                    <button onclick="toggleTask(${task.id})">
                        ${
                            task.completed
                                ? "↩️"
                                : "✅"
                        }
                    </button>

                    <button onclick="editTask(${task.id})">
                        ✏️
                    </button>

                    <button onclick="deleteTask(${task.id})">
                        🗑️
                    </button>
                </div>
            `;

            if (task.completed) {
                li.classList.add(
                    "completed"
                );
            }

            taskList.appendChild(li);
        });

    updateStatistics();
}