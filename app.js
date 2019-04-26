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

  // Remove the task event
  taskList.addEventListener("click", removeTask);

  // Clear all the tasks
  clearBtn.addEventListener("click", clearTasks);
}

// Adding the Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a Task");
  } else {
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

    console.log(li);
  }

  e.preventDefault();
}

// Remove the task
function removeTask(e) {
  // console.log(e.target.parentElement)

  if (e.target.parentElement.classList.contains("delete-item")) {
    e.target.parentElement.parentElement.remove();
  }
}

// Clear all the tasks
function clearTasks(e) {
  // taskList.innerHTML = '';

  // The Fastest way to remove
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}
