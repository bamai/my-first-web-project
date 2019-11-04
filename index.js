let clickHandler = function(event){
    if(event.target.parentNode.className == "done"){
        event.target.src = event.target.src.endsWith("unticked.png")? "ticked.jpeg" : "unticked.png";
    }
    if(event.target.parentNode.className=="remove"){
        let ul = event.target.parentNode.parentNode.parentNode;
        ul.removeChild(event.target.parentNode.parentNode);
        if(ul.children.length===0){
            let li = document.createElement('LI');
            li.appendChild(document.createTextNode("you have no tasks"));
            ul.appendChild(li);
        }
    }
}

let updateInput = function(event){
    if(event.target.value.endsWith("\n")){
        addHandler();
        return;
    }
    inputValue = event.target.value;
}

let createLi = function(){
    let todoButton = document.createElement('BUTTON');
    todoButton.appendChild(document.createElement('IMG'));
    todoButton.firstChild.src = "unticked.png";
    todoButton.className = "done";
    let rmvButton = document.createElement('BUTTON');
    rmvButton.appendChild(document.createElement('IMG'));
    rmvButton.firstChild.src = "remove.png";
    rmvButton.className = "remove";
    let span = document.createElement('SPAN');
    span.appendChild(document.createTextNode(inputValue));
    let li = document.createElement('LI');
    li.appendChild(todoButton);
    li.appendChild(span);
    li.appendChild(rmvButton);
    li.className = "todoitem";
    return li;
}

let addHandler = function(){
    if(!(inputValue=== ""||inputValue== null)){
        let listarr = document.getElementById("list").children;
        inputValue = inputValue.endsWith("\n")? inputValue.slice(0,inputValue.length): inputValue;
        if(listarr[0].firstChild.data=="you have no tasks"){
            document.getElementById("list").removeChild(document.getElementById("list").children[0]);
        }
        for(let i=0;i<listarr.length;i++){
            if(listarr[i].children[1].firstChild.data===inputValue){
                alert("you already have this task");
                return;
            }
        }
        document.getElementById("list").appendChild(createLi());
        inputValue = "";
        document.getElementById("input").value = "";
    }
    else{
        alert("no task to add");
    }
}

let inputValue;

window.onload = function(){
    let list = document.getElementById("list");
    list.addEventListener('click',clickHandler);
    let input = document.getElementById("input");
    input.addEventListener('input',updateInput);
    let addButton = document.getElementById("add");
    addButton.addEventListener('click', addHandler);

}

