let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editingTaskId = null;

const taskInput = document.getElementById("taskInput");
const deadlineInput = document.getElementById("deadlineInput");
const priorityInput = document.getElementById("priorityInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");
const themeBtn = document.getElementById("themeBtn");
const categoryInput = document.getElementById("categoryInput");
const categoryFilter = document.getElementById("categoryFilter");
const editModal = document.getElementById("editModal");
const editTaskInput = document.getElementById("editTaskInput");
const saveEditBtn = document.getElementById("saveEditBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");

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
        category: categoryInput.value,
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
    .filter(task => {

        if (categoryFilter.value === "all") {
            return true;
        }

        return (task.category === categoryFilter.value);
    })
    .forEach(task => {
    const li = document.createElement("li");

        li.className = `task-item priority-${task.priority}`;

        li.innerHTML = `
            <div>
                <h3>${task.title}</h3>
                <p>Приоритет: ${task.priority}</p>
                <p>Категория: ${task.category}</p>
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

    categoryFilter.addEventListener(
    "change",
    renderTasks
    );

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

    editingTaskId = id;

    editTaskInput.value = task.title;

    editModal.classList.add("show");
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
saveEditBtn.addEventListener(
    "click",
    () => {

        const task =
            tasks.find(
                task =>
                    task.id === editingTaskId
            );

        if (!task) {
            return;
        }

        const newTitle =
            editTaskInput.value.trim();

        if (!newTitle) {
            return;
        }

        task.title = newTitle;

        saveTasks();

        renderTasks();

        editModal.classList.remove("show");
    }
);
cancelEditBtn.addEventListener(
    "click",
    () => {

        editModal.classList.remove(
            "show"
        );
    }
);
editModal.addEventListener(
    "click",
    event => {

        if (
            event.target === editModal
        ) {
            editModal.classList.remove(
                "show"
            );
        }
    }
);