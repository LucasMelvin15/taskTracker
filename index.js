//1.Fully load all the DOM content to make sure everything has been parsed
document.addEventListener("DOMContentLoaded", function () {
  //2. Set up DOM manipulation for the HTML file
  const taskInput = document.getElementById("taskInput");
  const addButton = document.getElementById("addButton");
  const taskList = document.getElementById("taskList");

  //3. get tasks from local storage and set up error handling

  function getTasksFromLocalStorage() {
    const tasksJSON = localStorage.getItem("tasks");

    try {
      return tasksJSON ? JSON.parse(tasksJSON) : [];
    } catch (error) {
      console.error("Error parsing tasks from local storage:", error);
      return [];
    }
  }

  //4. save tasks to localstorage
  function saveTaskstoLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  //5. display tasks on the ui

  function displayTasks() {
    const tasks = getTasksFromLocalStorage();
    taskList.innerHTML = ""; // Clear existing tasks from the UI
    tasks.forEach(function (task, index) {
      const taskItem = document.createElement("li");
      taskItem.textContent = task.text;

      // Create a delete button for each task
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", function () {
        // Remove the task from the tasks array
        tasks.splice(index, 1);
        // Update the UI
        displayTasks();
        // Save the updated tasks list to local storage
        saveTasksToLocalStorage(tasks);
      });

      // Append the delete button to the task item
      taskItem.appendChild(deleteButton);

      // Append the task item to the task list
      taskList.appendChild(taskItem);
    });
  }

  // Function to save tasks to local storage
  function saveTasksToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Add an event listener to listen to clicks on the "Add" button
  addButton.addEventListener("click", addTask);

  // Add an event listener to listen for "Enter" key press to add task
  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

  // Display tasks when the page loads
  displayTasks();

  //add task
  function addTask() {
    //add value to the input
    const taskText = taskInput.value;
    if (taskText.trim() !== "") {
      //checks if the input is empty and removes any white spaces

      const newTask = { text: taskText }; // creates a new task array and assigns the value to the tasktext above
      const tasks = getTasksFromLocalStorage(); // get existing tasks from local storage, push a new task and save locally and call the display function, add value to the input
      tasks.push(newTask);
      saveTaskstoLocalStorage(tasks);
      displayTasks();
      taskInput.value = "";
    }
  }
  addButton.addEventListener("click", addTask);

  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });
  displayTasks();
});
