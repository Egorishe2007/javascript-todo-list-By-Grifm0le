let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const deadlineInput = document.getElementById("deadlineInput");
const priorityInput = document.getElementById("priorityInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");
const themeBtn = document.getElementById("themeBtn");

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
    .filter(task => {
        return task.title
            .toLowerCase()
            .includes(searchText);
    })
    .filter(task => {
        if (filterSelect.value === "active") {
            return !task.completed;
        }

        if (filterSelect.value === "completed") {
            return task.completed;
        }

        return true;
    })
    .forEach(task => {
    const li = document.createElement("li");

        li.className = `task-item priority-${task.priority}`;

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

                <button onclick="editTask(${task.id})">
                    ✏️
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

function editTask(id) {

    const task =
        tasks.find(task => task.id === id);

    if (!task) {
        return;
    }

    const newTitle = prompt(
        "Введите новое название задачи:",
        task.title
    );

    if (
        newTitle === null ||
        newTitle.trim() === ""
    ) {
        return;
    }

    task.title = newTitle.trim();

    saveTasks();

    renderTasks();
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

filterSelect.addEventListener(
    "change",
    renderTasks
);

const savedTheme =
    localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
}

themeBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark"
        );

        const isDark =
            document.body.classList.contains(
                "dark"
            );

        localStorage.setItem(
            "theme",
            isDark ? "dark" : "light"
        );
    }
);