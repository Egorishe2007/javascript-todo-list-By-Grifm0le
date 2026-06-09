function filterTasks(tasks) {

    const searchText =
        searchInput.value.toLowerCase();

    return tasks

        .filter(task => {
            return task.title
                .toLowerCase()
                .includes(searchText);
        })

        .filter(task => {

            if (
                categoryFilter.value === "all"
            ) {
                return true;
            }

            return (
                task.category ===
                categoryFilter.value
            );
        })

        .filter(task => {

            if (
                filterSelect.value ===
                "active"
            ) {
                return !task.completed;
            }

            if (
                filterSelect.value ===
                "completed"
            ) {
                return task.completed;
            }

            return true;
        });
}