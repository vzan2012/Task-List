// Defining the UI Variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Loading all the Event Listeners
loadEventListeners();

// Loading all the Event Listeners
function loadEventListeners() {
  // Add the task event
  form.addEventListener("submit", addTask);

  // DOM Load Events
  document.addEventListener("DOMContentLoaded", getTasks);

  // Remove the task event
  taskList.addEventListener("click", removeTask);

  // Clear all the tasks
  clearBtn.addEventListener("click", clearTasks);

  // Filter Task Events
  filter.addEventListener("keyup", filterTasks);
}

// Adding the Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a Task");
  } else {
    // Store the tasks in the Local Storage
    storeTaskInLocalStorage(taskInput.value);

    // Create li element
    const li = document.createElement("li");

    // Add a class to the list element
    li.className = "collection-item";

    // Creating a text node and append to the li
    li.appendChild(document.createTextNode(taskInput.value));

    // Create new link document
    const link = document.createElement("a");

    // Adding a class
    link.className = "delete-item secondary-content";

    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // Append the link to the li
    li.appendChild(link);

    // Append li to the ul
    taskList.appendChild(li);    

    // Clear the input field
    taskInput.value = "";
  }

  e.preventDefault();
}

// Load the Tasks
function getTasks() {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task) {
    // Create li element
    const li = document.createElement("li");

    // Add a class to the list element
    li.className = "collection-item";

    // Creating a text node and append to the li
    li.appendChild(document.createTextNode(task));

    // Create new link document
    const link = document.createElement("a");

    // Adding a class
    link.className = "delete-item secondary-content";

    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // Append the link to the li
    li.appendChild(link);

    // Append li to the ul
    taskList.appendChild(li);
  });
}

// Store the tasks
function storeTaskInLocalStorage(task) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove the task
function removeTask(e) {
  // console.log(e.target.parentElement)
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure to Delete the Task ?")) {
      e.target.parentElement.parentElement.remove();

      // Remove the task from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  // console.log(taskItem);

  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  
  // console.log(tasks);

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task) {
      tasks.splice(index, 1);
      // console.log(tasks);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));

}

// Clear all the tasks
function clearTasks(e) {
  // taskList.innerHTML = '';

  // The Fastest way to remove
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear Tasks from Local Storage
  clearTasksFromLocalStorage();
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  // console.log(text);

  document.querySelectorAll(".collection-item").forEach(function(task) {
    // console.log(task);

    const item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
