const API_URL = "http://localhost:5000/tasks";

const taskList = document.getElementById("taskList");
const taskForm = document.getElementById("taskForm");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

taskForm.addEventListener("submit", addTask);

async function addTask(e){

e.preventDefault();

const title = document.getElementById("title").value;
const description = document.getElementById("description").value;

await fetch(API_URL,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
title,
description
})
});

taskForm.reset();
loadTasks();
}

async function loadTasks(){

const res = await fetch(API_URL);
const tasks = await res.json();

taskList.innerHTML="";

let total = tasks.length;
let completed = tasks.filter(t=>t.completed).length;
let pending = total - completed;

totalTasks.innerText = total;
completedTasks.innerText = completed;
pendingTasks.innerText = pending;

tasks.forEach(task=>{

const li = document.createElement("li");

li.innerHTML = `
<div class="task ${task.completed ? "completed" : ""}">

<div class="task-left">

<div class="task-text">

<strong>${task.title}</strong>

<p>${task.description}</p>

<small>Status: ${task.completed ? "Completed" : "Pending"}</small>

</div>

</div>

<div class="task-buttons">

<button class="complete-btn"
onclick="toggleComplete('${task._id}', ${task.completed})">
✔
</button>

<button class="delete-btn"
onclick="deleteTask('${task._id}')">
🗑
</button>

</div>

</div>
`;

taskList.appendChild(li);

});
}

async function toggleComplete(id,status){

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

async function deleteTask(id){

await fetch(API_URL+"/"+id,{
method:"DELETE"
});

loadTasks();
}

loadTasks();
