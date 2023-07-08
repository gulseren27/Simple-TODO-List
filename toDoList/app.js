
let form = document.querySelector("#todoAddForm");
let addInput = document.querySelector("#input");
let filterToDo = document.querySelector("#filtre");
let title = document.querySelector(".card-title3");
let listToDo = document.querySelector(".list-group");
let firstCardBody = document.querySelector(".card-body");
let lastCardBody = document.querySelector(".card-body2");
let deleteToDo = document.querySelector("#clearButton");

let todos = [];




runEvents();

function runEvents(){

    form.addEventListener("submit",addToDo);
    document.addEventListener("DOMContentLoaded",pageLoaded);
    lastCardBody.addEventListener("click",removeTodoToArayüz);
    deleteToDo.addEventListener("click",clearAllTodo);
    filterToDo.addEventListener("keyup",filter);
}




function filter(e){
    const filterValue = e.target.value.toLowerCase().trim() ;
    const todoListesi = document.querySelectorAll(".list-group-item");


    if(todoListesi.length>0){
        todoListesi.forEach(function(todo){
            if(todo.textContent.toLowerCase().trim().includes(filterValue)){
                todo.setAttribute("style","display : block");

            }else{
                todo.setAttribute("style","display : none !important");
            }
           

        });

    } else{
        showAlert("warning","Fitreleme için en az bir todo olmalı!");
    }

}


function clearAllTodo(){
    const todoListesi = document.querySelectorAll(".list-group-item");
    if(todoListesi.length>0){
        //ekrandan silme 
        todoListesi.forEach(function(todo){
            todo.remove();
            
        });

        todos =[];
        localStorage.setItem("todos",JSON.stringify(todos));

        showAlert("warning","Tüm todolar temizlendi!");


    }else{
        showAlert("warning","Silmek için en az bir todo olmalı!");
    }
}



function removeTodoToArayüz(e){

if(e.target.className==="close"){

    //ekrandan silme
     const todo = e.target.parentElement.parentElement;
     todo.remove();


    // storage den silme
    removeTodoToStorage(todo.textContent);



    
   showAlert("success","To Do Başarıyla Silindi");
    
}


}

function removeTodoToStorage(removeTodo){
    checkTodoStorage();
    todos.forEach(function(todo,index){

         if(removeTodo==todos){

            todos.splice(index,1);
     }

    });
    localStorage.setItem("todos",JSON.stringify(todos));
        
    
}






function pageLoaded(){
    checkTodoStorage();
    todos.forEach(function(todo){
        addToDoToArayüz(todo);
    });

}



function addToDo(e){
    const inputText = addInput.value.trim();
    if(inputText == null || inputText == ""){
        showAlert("warning","To Do Eklemelisiniz!")
        //alert("To Do Eklemelisiniz!");
    }
    else{
        addToDoToArayüz(inputText);
        
        addToDoToStorage(inputText);

        showAlert("success","To Do Eklendi");
       // alert("eklendi");
    }

    e.preventDefault();   // yeni sekmede açmayı engelle
}

function addToDoToArayüz(newToDo){

    const li = document.createElement("li");
    li.className="list-group-item d-flex justify-content-between";
    li.textContent = newToDo ;

    const a = document.createElement("a");
    a.href ="#";
    a.className = "delete-item";

    const i = document.createElement("i");
    i.className = "close";
    i.innerHTML="\u00d7";

   
    a.appendChild(i);
    li.appendChild(a);
    listToDo.appendChild(li);

    addInput.value = "";

}

// Add a "checked" symbol when clicking on a list item
 var list = document.querySelector('ul');
 list.addEventListener('click', function(e) {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('checked');
    
   }
 }, false);


function addToDoToStorage(newToDo){
    checkTodoStorage();
    todos.push(newToDo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function checkTodoStorage(newToDo){

    if(localStorage.getItem("todos")===null){
        todos =[];
    }else{
       todos = JSON.parse(localStorage.getItem("todos"));
    
    }
}

function showAlert(type,message){
    const div = document.createElement("div");
    div.className="alert alert-"+type;
    div.textContent=message;

    firstCardBody.appendChild(div);

   



    setTimeout(function(){
        div.remove();
    },2500);
 }

 
