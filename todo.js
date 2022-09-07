(function () {
    let tasks = [];
    const tasksList = document.getElementById('list');
    const addTaskInput = document.getElementById('add');
    const tasksCounter = document.getElementById('tasks-counter');

    console.log('Working');

    // function fetchTodos() {
    //     fetch('https://jsonplaceholder.typicode.com/todos')
    //         .then((response) => response.json())
    //         .then((data) => {
    //             const startIndex = Math.floor(Math.random() * 190);
    //             tasks = data.slice(startIndex, startIndex + 10);
    //             renderList();
    //         })
    //         .catch((error) => console.log(error));
    // }

    async function fetchTodos() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            const data = await response.json();
            const startIndex = Math.floor(Math.random() * 190);
            tasks = data.slice(startIndex, startIndex + 10);
            renderList();
        } catch (error) {
            console.log(error);
        }

    }

    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.innerHTML = `
        <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
        <label for="${task.id}">${task.title}</label>
        <img src="delete.svg" class="delete" data-id="${task.id}" />`
        tasksList.append(li);
    }

    function renderList() {
        tasksList.innerHTML = '';
        for (let i = 0; i < tasks.length; i++) {
            addTaskToDOM(tasks[i]);
        }
        tasksCounter.innerText = tasks.length;
    }

    function toggleTask(taskId) {
        const task = tasks.find(item => item.id === taskId);
        if (task) {
            task.completed = !task.completed;
            renderList();
            showNotification('Task has been toggled!');
            return;
        }
        showNotification('couldn\'t toggle the task');
    }

    function deleteTask(taskId) {
        const newTasks = tasks.filter((task) => task.id !== taskId);
        tasks = newTasks;
        renderList();
        showNotification('Task has been deleted successfully!');
    }

    function addTask(task) {
        if (task) {
            tasks.push(task);
            renderList();
            showNotification('Task has been added successfully!');
            return;
        }
        showNotification('Task can\'t be added!');
    }

    function showNotification(text) {
        alert(text, 1000);
    }

    function handleInputKeyPress(e) {
        if (e.key === 'Enter') {
            const text = e.target.value;
            if (!text) {
                showNotification('Task text can\'t be empty!');
                return;
            }

            addTask({
                title: text,
                id: Date.now().toString(),
                completed: false
            })
            e.target.value = '';
        }
    }

    function handleClickListener(event) {
        const target = event.target;

        if (target.className === 'delete') {
            const taskId = target.dataset.id;
            deleteTask(taskId);
        } else if (target.className === 'custom-checkbox') {
            const taskId = target.id;
            toggleTask(taskId);
        }
    }

    function initialize() {
        fetchTodos();
        addTaskInput.addEventListener('keyup', handleInputKeyPress);
        document.addEventListener('click', handleClickListener);
    }

    initialize();

})();
