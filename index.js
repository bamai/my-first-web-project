window.onload = function(){
    let todos = [];
    const list = document.getElementById("list");
    const menu = document.getElementById("options");
    const addButton = document.getElementById("add");
    let clickHandler = function(event){
        let button = event.target.parentNode;
        if(button.className === "isdone"){
            event.target.src = event.target.src.endsWith("unticked.png")? "ticked.jpeg" : "unticked.png";
            if(button.parentNode.className === "todoitem"){
                if(list.className === "list undone"){
                    button.parentNode.style.opacity = "0";
                    setTimeout(()=>{button.parentNode.className = "tickedtodoitem";
                                    button.parentNode.style.opacity = "1";},400)
                }
                else
                    button.parentNode.className = "tickedtodoitem";
            }
            else{
                if(list.className === "list done"){
                    button.parentNode.style.opacity = "0";
                    setTimeout(()=>{button.parentNode.className = "todoitem";
                                    button.parentNode.style.opacity = "1";},400)
                }
                else
                    button.parentNode.className = "todoitem";
            }
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
            liToRemove.style.opacity = "0";
            setTimeout(()=>{list.removeChild(liToRemove);
                        if(list.children.length===0){
                        let li = document.createElement('LI');
                        li.appendChild(document.createTextNode("you have no todos"));
                        list.appendChild(li);}},400);
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
        if(menu.children[1].className === "menu focused"){
            li.style.display = 'none';
        }
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

    let changeListMode = function(mode){
        if(mode === "done"){
            if(list.className === "list all"){
                list.className = "allToDone";
                setTimeout(()=>{list.className = "list done";},400);
            }
            else{
                list.className = "list done";
            }
        }
        else{
            if(list.className === "list all"){
                list.className = "allToUndone";
                setTimeout(()=>{list.className = "list undone";},400);
            }
            else{
                list.className = "list undone";
            }
        }
    }

    let menuHandler = function(event){
        if(event.target.id==="all"){
            menu.children[0].className = "menu focused";
            menu.children[1].className = "menu";
            menu.children[2].className = "menu";
            list.className = "list all";
        }
        if(event.target.id==="done"){
            menu.children[1].className = "menu focused";
            menu.children[0].className = "menu";
            menu.children[2].className = "menu";
            changeListMode("done");
        }
        if(event.target.id==="undone"){
            menu.children[2].className = "menu focused";
            menu.children[1].className = "menu";
            menu.children[0].className = "menu";
            changeListMode("undone");
        }
    }
    
    
    list.addEventListener('click',clickHandler);
    addButton.addEventListener('click', addHandler);
    menu.addEventListener('click',menuHandler);

}