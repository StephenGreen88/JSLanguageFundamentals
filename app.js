// DOM SELECTORS <-- document object methods (allows up to pull things from the DOM)

// document.getElementById() <-- This is a single selector
console.log(document.getElementById('task-title'));

// Get things from the element
console.log(document.getElementById('task-title').id);

const taskTitle = document.getElementById('task-title'); // <-- Saving the getElementByID selector to a variable to shorten code

// Change styling <-- you can change the style of elements using JS. Use this more for dynamic styling (hover, etc)
taskTitle.style.background ='#333';
taskTitle.style.color ='#fff';
taskTitle.style.padding ='5px';
// document.getElementById('task-title').style.display ='none'; // <-- This will make things disappear

// Change Content
taskTitle.textContent = 'Task List';
taskTitle.innerText = 'My Tasks';
taskTitle.innerHTML = "<span style='color: red'>Task List</span>";

// document.querySelector() <-- This is a single selector
console.log(document.querySelector('#task-title'));
console.log(document.querySelector('.card-title'));
console.log(document.querySelector('h5')); // <-- This would only grab the first h5 element

document.querySelector('li').style.color = 'red';
document.querySelector('ul li').style.color = 'blue';

document.querySelector('li:last-child').style.color = 'red';
document.querySelector('li:nth-child(3)').style.color = 'pink';
document.querySelector('li:nth-child(4)').textContent = 'Hello, world!';
document.querySelector('li:nth-child(odd)').style.background = '#ccc';
