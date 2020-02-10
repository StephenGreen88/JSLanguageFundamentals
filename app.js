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
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task Event
    taskList.addEventListener('click', removeTask);
    // Clear tasks event
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
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

// Remove Task <-- Remove a single task per click
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) { // <-- The confirm alerts out the 'Are you sure?' string to the user
            e.target.parentElement.parentElement.remove(); // <-- Using parentElement.parentElement to move up the DOM and remove the entire list item not just the icon
        }
    }
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