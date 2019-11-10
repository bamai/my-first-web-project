let todos = [];

let clickHandler = function(event){
    if(event.target.parentNode.className === "isdone"){
        event.target.src = event.target.src.endsWith("unticked.png")? "ticked.jpeg" : "unticked.png";
        event.target.parentNode.parentNode.className = event.target.parentNode.parentNode.className === "todoitem"? "tickedtodoitem" : "todoitem";
    }
    if(event.target.parentNode.className === "remove"){
        let liToRemove = event.target.parentNode.parentNode;
        for(let i = 0; i<todos.length; i++){
            if(liToRemove.children[1].textContent===todos[i]){
                while(i<todos.length-1){
                    todos[i] = todos[i+1];
                    i++;
                }
                todos.pop();
            }
        }
        list.removeChild(liToRemove);
        if(list.children.length===0){
            let li = document.createElement('LI');
            li.appendChild(document.createTextNode("you have no todos"));
            list.appendChild(li);
        }
    }
}


let createLi = function(){
    let todoButton = document.createElement('BUTTON');
    todoButton.appendChild(document.createElement('IMG'));
    todoButton.firstChild.src = "unticked.png";
    todoButton.className = "isdone";
    let rmvButton = document.createElement('BUTTON');
    rmvButton.appendChild(document.createElement('IMG'));
    rmvButton.firstChild.src = "remove.png";
    rmvButton.className = "remove";
    let span = document.createElement('SPAN');
    span.appendChild(document.createTextNode(input.value));
    let li = document.createElement('LI');
    li.appendChild(todoButton);
    li.appendChild(span);
    li.appendChild(rmvButton);
    li.className = "todoitem";
    return li;
}

let addHandler = function(){
    let input = document.getElementById("input");
    if(!(input.value=== ""||input.value == null)){
        if(list.children[0].textContent === "you have no todos"){
            list.removeChild(list.children[0]);
        }
        for(let i=0;i<todos.length;i++){
            if(todos[i]===input.value){
                alert("you already have this task");
                return;
            }
        }
        todos.push(input.value);
        list.appendChild(createLi());
        input.value = "";
    }
    else{
        alert("no task to add");
    }
}

let menuHandler = function(event){
    let menu = document.getElementsByClassName("menu");
    if(event.target.id==="all"){
        menu[0].setAttribute("style" ,"background-color: rgb(160, 189, 202)");
        menu[1].setAttribute("style" ,"background-color: rgb(235, 235, 235)");
        menu[2].setAttribute("style" ,"background-color: rgb(235, 235, 235)");
        for(let i = 0;i<list.children.length;i++){
            list.children[i].style.display = 'block';
        }
    }
    if(event.target.id==="done"){
        menu[0].setAttribute("style" ,"background-color: rgb(235, 235, 235)");
        menu[1].setAttribute("style" ,"background-color: rgb(160, 189, 202)");
        menu[2].setAttribute("style" ,"background-color: rgb(235, 235, 235)");
        for(let i = 0;i<list.children.length;i++){
            list.children[i].style.display = list.children[i].className === "todoitem"? 'none' : 'block';
        }
    }
    if(event.target.id==="undone"){
        menu[0].setAttribute("style" ,"background-color: rgb(235, 235, 235)");
        menu[1].setAttribute("style" ,"background-color: rgb(235, 235, 235)");
        menu[2].setAttribute("style" ,"background-color: rgb(160, 189, 202)");
        for(let i = 0;i<list.children.length;i++){
            list.children[i].style.display = list.children[i].className === "todoitem"? 'block' : 'none';
        }
    }
}

window.onload = function(){
    var list = document.getElementById("list");
    list.addEventListener('click',clickHandler);
    const addButton = document.getElementById("add");
    addButton.addEventListener('click', addHandler);
    var menu = document.getElementById("options");
    menu.addEventListener('click',menuHandler);

}

