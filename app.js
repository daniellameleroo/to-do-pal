const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const bgColorPicker = document.getElementById('bg-color-picker');

// Load tasks and background color when the page loads
// document.addEventListener('DOMContentLoaded', function () {
//     loadTasks();
//     loadBackgroundColor(); // Load the saved background color
// });

// Add event listener for the 'Add Task' button
addTaskBtn.addEventListener('click', function () {
    addTask();
});

// Add event listener to handle pressing 'Enter' to add a task
taskInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Add event listener to handle background color change
// bgColorPicker.addEventListener('input', function () {
//     const color = bgColorPicker.value;
//     document.body.style.backgroundColor = color;
//     localStorage.setItem('backgroundColor', color); // Save the selected color
// });

// // Function to load the saved background color
// function loadBackgroundColor() {
//     const savedColor = localStorage.getItem('backgroundColor');
//     if (savedColor) {
//         document.body.style.backgroundColor = savedColor;
//         bgColorPicker.value = savedColor; // Set the color picker to the saved value
//     }
// }

// Function to add a task
function addTask() {
    const taskText = taskInput.value;

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    addTaskToDOM(taskText);
    saveTaskToLocalStorage(taskText);

    taskInput.value = ''; // Clear the input field after adding the task
}

// Function to add task to the DOM
function addTaskToDOM(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');

    // Delete task from the list and localStorage
    deleteBtn.addEventListener('click', function () {
        taskList.removeChild(li);
        deleteTaskFromLocalStorage(taskText);
    });

    // Toggle task completion
    li.addEventListener('click', function () {
        li.classList.toggle('completed');
        updateTaskCompletionInLocalStorage(taskText, li.classList.contains('completed'));
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Save task to localStorage
function saveTaskToLocalStorage(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get tasks from localStorage
function getTasksFromLocalStorage() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}

// Load tasks from localStorage
function loadTasks() {
    let tasks = getTasksFromLocalStorage();
    tasks.forEach(function (task) {
        addTaskToDOM(task.text);
        const li = taskList.lastChild;
        if (task.completed) {
            li.classList.add('completed');
        }
    });
}

// Delete task from localStorage
function deleteTaskFromLocalStorage(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update task completion status in localStorage
function updateTaskCompletionInLocalStorage(taskText, isCompleted) {
    let tasks = getTasksFromLocalStorage();
    tasks.forEach(task => {
        if (task.text === taskText) {
            task.completed = isCompleted;
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
