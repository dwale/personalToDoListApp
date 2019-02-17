//DEfine UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearList = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all event listeners

loadAllEventListeners();

function loadAllEventListeners() {
//Add Task Event
form.addEventListener('submit', addTask);

taskList.addEventListener('click', removeTask);

clearList.addEventListener ('click', clearTasks);

filter.addEventListener ('keyup', filterTasks);

document.addEventListener('DOMContentLoaded', getTasks);

} 

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach (
    function (task) {
      const item = task.firstChild.textContent;
      if (item.toLowerCase().indexOf(text) != -1) {
        task.style.display = 'block'
      } else {
        task.style.display = 'none';
      }

    }
  )
}

function clearTasks () {
  taskList.innerHTML = '';
  localStorage.clear();
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains(`delete-item`)) {
        if (confirm(`Are you sure?`)) {
        e.target.parentElement.parentElement.remove();
        removeTaskFromLocalStorage(e.target.parentElement.parentElement)
  }
  }
  e.preventDefault
}

function addTask(e) {
  e.preventDefault();
  if (taskInput.value === '') {
    alert('Add a task');
    return;
  } else{

  const li = document.createElement('li');
  li.className = 'collection-item';

  li.appendChild(document.createTextNode(taskInput.value));

  const link = document.createElement('a');
  const delIcon = document.createElement('i')

  link.className = 'delete-item secondary-content';
  delIcon.className = 'fa fa-remove';
  link.appendChild(delIcon);

  // link.innerHTML = '<i class = "fa fa-remove"></li>';
  li.appendChild(link);

  taskList.appendChild(li);

  storeInLocalStorage(taskInput.value);

  taskInput.value = '';
  }
}

function storeInLocalStorage (task) {
let tasks;
if (localStorage.getItem('tasks') === null) {
  tasks = [];
} else {
  tasks = JSON.parse(localStorage.getItem('tasks'));
}

tasks.push(task);

localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
  let tasks;
if (localStorage.getItem('tasks') === null) {
  tasks = [];
} else {
  tasks = JSON.parse(localStorage.getItem('tasks'));
}
tasks.forEach(function(task) {
  const li = document.createElement('li');
  li.className = 'collection-item';

  li.appendChild(document.createTextNode(task));

  const link = document.createElement('a');
  const delIcon = document.createElement('i')

  link.className = 'delete-item secondary-content';
  delIcon.className = 'fa fa-remove';
  link.appendChild(delIcon);

  // link.innerHTML = '<i class = "fa fa-remove"></li>';
  li.appendChild(link);

  taskList.appendChild(li);

})

}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  task.forEach(function (task, index){
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  })
  localStorage.setItem('tasks', JSON.stringify(tasks));


}