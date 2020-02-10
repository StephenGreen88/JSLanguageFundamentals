// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all events listeners
loadEvenListeners();

// Load all event listener functions
function loadEvenListeners() {
    // DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task Event
    taskList.addEventListener('click', removeTask);
    // Clear tasks event
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

// Get Tasks From LS
function getTasks() {
    let tasks; // < -- Initializing a variable
    if (localStorage.getItem('tasks') === null) {
        tasks = []; // <-- If nothing's in local storage create an empty array
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks')); // <-- Parsing as JSON as local storage can only store strings
    }
    // Loop through the tasks that are in local storage
    tasks.forEach(function (task) {
        // Create li element
        const li = document.createElement('li');

        // Add class
        li.className = 'collection-item';

        // Create text node and append to li
        li.appendChild(document.createTextNode(task));

        // Create new link element
        const link = document.createElement('a');

        // Add class
        link.className = 'delete-item secondary-content'; // <-- This places the new link right of the list item

        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';

        // Append the link to li
        li.appendChild(link); // <-- This appends the link to the list element

        // Append li to the ul
        taskList.appendChild(li);
    });
}

// Add Task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    }

    // Create li element
    const li = document.createElement('li');

    // Add class
    li.className = 'collection-item';

    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    // Create new link element
    const link = document.createElement('a');

    // Add class
    link.className = 'delete-item secondary-content'; // <-- This places the new link right of the list item

    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // Append the link to li
    li.appendChild(link); // <-- This appends the link to the list element

    // Append li to the ul
    taskList.appendChild(li);

    // Store in localStorage
    storeTaskInLocalStorage(taskInput.value); // <-- Capturing the input value and storing it in local storage.

    // Clear input
    taskInput.value = '';

    e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
    let tasks; // < -- Initializing a variable
    if (localStorage.getItem('tasks') === null) {
        tasks = []; // <-- If nothing's in local storage create an empty array
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks')); // <-- Parsing as JSON as local storage can only store strings
    }

    tasks.push(task); // <-- Adding the task onto the array
    // Store in local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task <-- Remove a single task per click
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) { // <-- The confirm alerts out the 'Are you sure?' string to the user
            e.target.parentElement.parentElement.remove(); // <-- Using parentElement.parentElement to move up the DOM and remove the entire list item not just the icon

            // Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove from LS
function removeTaskFromLocalStorage(taskitem) {
    let tasks; // < -- Initializing a variable
    if (localStorage.getItem('tasks') === null) {
        tasks = []; // <-- If nothing's in local storage create an empty array
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks')); // <-- Parsing as JSON as local storage can only store strings
    }
    // Loop through
    tasks.forEach(function (task, index) {
        if (taskitem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    // Set local storage again
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks <-- Clear all tasks by clicking the 'clear tasks' button
function clearTasks() {
    // Slower option
    // taskList.innerHTML = ''; 

    // Faster option using a while loop
    // This loop basically says, "While there's a firstChild, remove it")
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // Clear from LS
    clearTasksFromLocalStorage();
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
    localStorage.clear(); // <-- This will clear out everything, even if I reload it'll stay gone
}

// Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase(); // <-- This will give us whatever is being typed in and convert it to lower case

    document.querySelectorAll('.collection-item').forEach(function (task) { // <-- We can use forEach method because querySelectorAll returns a node list
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) { // <-- We're grabbing the index of whatever was typed in, it it's -1 that means there's nothing left to loop through
            task.style.dispaly = 'block'; // <-- If something's returned 'block' will show it
        } else {
            task.style.dispaly = 'none'; // <-- If nothing's returned nothing will be displayed
        }
    });
}