//get elements from page
const clear = document.querySelector('.clear');
const list = document.querySelector('.todo-list');
const addbutton = document.querySelector('.addbutton');
const input = document.querySelector('.add-item');
const listitem = document.querySelector('.item');
const currentdate = document.getElementById('date');


//output current date
currentdate.innerHTML = new Date().toLocaleString('utc',{weekday:"long", day: "numeric", month: "short"});
// creating variables for list items
const uncheck = 'fa-circle-thin';
const check = 'fa-check-circle';
const lined = 'lined';

//store todos
let tasklist, id;
// get task from ara
let data = localStorage.getItem("kekw");
if(data){
	tasklist = JSON.parse(data);	
	id = tasklist.length;	
	loadtasks(tasklist);
}
else {
	tasklist = [];
	id = 0;
}

// load saved items
function loadtasks(array){	
    array.forEach(function(item){    	
        createTodo(item.name, item.id, item.done, item.trash);
    });
}


// create our task in list
function createTodo(task,id,done,trash){
	if(trash){return}
	const isdone = done ? check : uncheck;
	const line = done ? lined : "";
	const text = `<li class="item">
					<i class="fa ${isdone}" job="complete" id="${id}"></i>	
					<p class="todo-desc ${line}">${task}</p>
					<i class="fa fa-trash" job="delete" id="${id}"></i>		
				</li>`;
	list.insertAdjacentHTML("afterbegin",text);
};
// event to add task
addbutton.addEventListener("click",addTodo);
document.addEventListener("keydown", event=> {
	if(event.key == "Enter"){
		addTodo();		
	}
});
// event to refresh local st
clear.addEventListener("click", function refresh() {
	localStorage.clear();
	location.reload();
});
// adding task to list 
function addTodo() {
	const task = input.value;
	if(task) {
		createTodo(task,id,false,false);
		tasklist.push(
		{
			name: task,
			id: id,
			done: false,
			trash: false
		});
		localStorage.setItem("kekw", JSON.stringify(tasklist));

		id++
	}
	input.value = "";
};

// task changes on complete
function taskcomplete(element){
	element.classList.toggle(check);
	element.classList.toggle(uncheck);
	element.parentNode.querySelector(".todo-desc").classList.toggle(lined);
	tasklist[element.id].done = tasklist[element.id].done ?  false: true;
	console.log(tasklist[element.id].done)
};

//task listener
list.addEventListener("click", event => {	
	const element = event.target;
	const eljob = element.attributes.job.value;
	if(eljob == "complete") {
		taskcomplete(element)		
	}	
	if(eljob == "delete") {
		removetask(element)		
	}	
	localStorage.setItem("kekw", JSON.stringify(tasklist));

});
// task remove
function removetask(element) {		
	element.parentNode.parentNode.removeChild(element.parentNode)
	tasklist[element.id].trash = true;
};





