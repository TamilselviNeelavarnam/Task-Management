const API="http://localhost:5000/tasks";

export async function getTasks(){
 const res=await fetch(API);
 return await res.json();
}

export async function addTask(task){
 await fetch(API,{
  method:"POST",
  headers:{ "Content-Type":"application/json"},
  body:JSON.stringify(task)
 });
}

export async function deleteTask(id){
 await fetch(`${API}/${id}`,{method:"DELETE"});
}

export async function updateTask(id,data){
 await fetch(`${API}/${id}`,{
  method:"PUT",
  headers:{ "Content-Type":"application/json"},
  body:JSON.stringify(data)
 });
}