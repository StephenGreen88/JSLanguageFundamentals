// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all events listeners
loadEvenListeners();

// Load all event listeners function
function loadEvenListeners() {
    // Add task event
    form.addEventListener('submit', addTask);
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

    // Clear input
    taskInput.value = '';

    e.preventDefault();
}