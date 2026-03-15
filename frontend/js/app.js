const API_URL = "http://localhost:5000/tasks";

const taskList = document.getElementById("taskList");
const taskForm = document.getElementById("taskForm");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");
const searchTask = document.getElementById("searchTask");

let allTasks = [];

taskForm.addEventListener("submit", addTask);

async function addTask(e){

e.preventDefault();

const title = document.getElementById("title").value;
const description = document.getElementById("description").value;
const dueDate = document.getElementById("dueDate").value;

await fetch(API_URL,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
title,
description,
dueDate
})
});

taskForm.reset();
loadTasks();
}

async function loadTasks(){

const res = await fetch(API_URL);
const tasks = await res.json();

allTasks = tasks;

updateStats(tasks);
displayTasks(tasks);

}

function displayTasks(tasks){

taskList.innerHTML="";

tasks.forEach(task=>{

const li = document.createElement("li");

li.innerHTML = `
<div class="task">
<div>

<input type="checkbox"
${task.completed ? "checked" : ""}
onchange="toggleComplete('${task._id}', ${task.completed})"
/>

<strong>${task.title}</strong>
<p>${task.description}</p>
<small>Due: ${task.dueDate ? new Date(task.dueDate).toLocaleDateString() : ""}</small>

</div>

<button class="delete-btn" onclick="deleteTask('${task._id}')">
🗑
</button>

</div>
`;

taskList.appendChild(li);

});

}

function updateStats(tasks){

const total = tasks.length;
const completed = tasks.filter(t=>t.completed).length;
const pending = total - completed;

totalTasks.textContent = total;
completedTasks.textContent = completed;
pendingTasks.textContent = pending;

}

searchTask.addEventListener("input",()=>{

const text = searchTask.value.toLowerCase();

const filteredTasks = allTasks.filter(task =>
task.title.toLowerCase().includes(text) ||
task.description.toLowerCase().includes(text)
);

displayTasks(filteredTasks);

});

window.toggleComplete = async function(id,status){

await fetch(API_URL+"/"+id,{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
completed:!status
})
});

loadTasks();

}

window.deleteTask = async function(id){

await fetch(API_URL + "/" + id,{
method:"DELETE"
});

loadTasks();

}

loadTasks();
