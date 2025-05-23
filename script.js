let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  const stats = document.getElementById("stats");
  taskList.innerHTML = "";

  let total = 0, completed = 0, pending = 0;

  tasks.forEach((task, index) => {
    if (currentFilter === "completed" && !task.completed) return;
    if (currentFilter === "pending" && task.completed) return;

    total++;
    if (task.completed) completed++;
    else pending++;

    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const info = document.createElement("span");
    info.className = "task-info";
    info.innerHTML = `<strong>${task.title}</strong><small>Due: ${task.date} | Category: ${task.category}</small>`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onchange = () => toggleComplete(index);

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.onclick = () => editTask(index);

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.onclick = () => deleteTask(index);

    const actionGroup = document.createElement("span");
    actionGroup.className = "actions";
    actionGroup.appendChild(checkbox);
    actionGroup.appendChild(editBtn);
    actionGroup.appendChild(delBtn);

    li.appendChild(info);
    li.appendChild(actionGroup);
    taskList.appendChild(li);
  });

  stats.textContent = `Total: ${total} | Completed: ${completed} | Pending: ${pending}`;
}

function addTask() {
  const title = document.getElementById("taskInput").value.trim();
  const date = document.getElementById("dateInput").value;
  const category = document.getElementById("categoryInput").value;

  if (title === "" || !date) return alert("Please enter a title and date!");

  tasks.push({ title, date, category, completed: false });
  saveTasks();
  renderTasks();

  document.getElementById("taskInput").value = "";
  document.getElementById("dateInput").value = "";
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function filterTasks(filterType) {
  currentFilter = filterType;
  renderTasks();
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

function editTask(index) {
  const newTitle = prompt("Edit task title:", tasks[index].title);
  if (newTitle !== null && newTitle.trim() !== "") {
    tasks[index].title = newTitle.trim();
    saveTasks();
    renderTasks();
  }
}

window.onload = renderTasks;
