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
categoryFilter.addEventListener(
    "change",
    renderTasks
);
renderTasks();
initTheme();