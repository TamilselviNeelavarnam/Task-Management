const API_URL = "http://localhost:5000/tasks";

const taskList = document.getElementById("taskList");
const taskForm = document.getElementById("taskForm");

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

<button onclick="deleteTask('${task._id}')">
🗑
</button>

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