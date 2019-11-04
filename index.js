let clickHandler = function(event){
    if(event.target.parentNode.className == "done"){
        event.target.src = event.target.src.endsWith("unticked.png")? "ticked.jpeg" : "unticked.png";
    }
    if(event.target.parentNode.className=="remove"){
        let ul = event.target.parentNode.parentNode.parentNode;
        ul.removeChild(event.target.parentNode.parentNode);
    }
}

let addHandler = function(event){
    let value = event.target.previousSibling.textContent;
    console.log(value);
}

let inputHandler

let inputValue;

window.onload = function(){
    let list = document.getElementById("list");
    list.addEventListener('click',clickHandler);
    let input = document.getElementById("input");
    input.addEventListener('input',inputHandler);
    let addButton = document.getElementById("add");
    addButton.addEventListener('click',addHandler);

}

