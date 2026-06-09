function updateStatistics() {
    const total = document.getElementById("totalTasks");
    const completed = document.getElementById("completedTasks");

    total.textContent = tasks.length;

    completed.textContent = tasks.filter(
        task => task.completed
    ).length;
}
