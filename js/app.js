let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const deadlineInput = document.getElementById("deadlineInput");
const priorityInput = document.getElementById("priorityInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");

addBtn.addEventListener("click", addTask);

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
        completed: false
    };

    tasks.push(task);
    saveTasks();

    renderTasks();
    saveTasks();

    taskInput.value = "";
    deadlineInput.value = "";
}

function renderTasks() {
    taskList.innerHTML = "";

    const searchText =
        searchInput.value.toLowerCase();

    tasks
        .filter(task =>
            task.title
                .toLowerCase()
                .includes(searchText)
        )
        .forEach(task => {
    const li = document.createElement("li");

        li.className = "task-item";

        li.innerHTML = `
            <div>
                <h3>${task.title}</h3>
                <p>Приоритет: ${task.priority}</p>
                <p>Дедлайн: ${task.deadline || "Не указан"}</p>
            </div>

            <div>
                <button onclick="toggleTask(${task.id})">
                    ${task.completed ? "↩️" : "✅"}
                </button>

                <button onclick="deleteTask(${task.id})">
                    🗑️
                </button>
            </div>
        `;

        if (task.completed) {
            li.classList.add("completed");
        }

        taskList.appendChild(li);
    });

    updateStatistics();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);

    renderTasks();
    saveTasks();
}

function toggleTask(id) {
    const task = tasks.find(task => task.id === id);

    if (task) {
        task.completed = !task.completed;
    }

    renderTasks();
    saveTasks();
}

function updateStatistics() {
    const total = document.getElementById("totalTasks");
    const completed = document.getElementById("completedTasks");

    total.textContent = tasks.length;

    completed.textContent = tasks.filter(
        task => task.completed
    ).length;
}

function saveTasks() {
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

renderTasks();

searchInput.addEventListener(
    "input",
    renderTasks
);