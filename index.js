let dataBase = [{"Title": "Good Will Hunting", "Year": "1997", "inDropdown":"no"},
                {"Title": "The Good, the Bad and the Ugly", "Year": "1966", "inDropdown":"no"},
                {"Title": "As Good as It Gets", "Year": "1997", "inDropdown":"no"},
                {"Title": "A Few Good Men", "Year": "1992", "inDropdown":"no"},
                {"Title": "A Good Day to Die Hard", "Year": "2013", "inDropdown":"no"},
                {"Title": "Good Bye Lenin!", "Year": "2003", "inDropdown":"no"},
                {"Title": "Good Morning, Vietnam", "Year": "1987", "inDropdown":"no"},
                {"Title": "The Good Shepherd", "Year": "2006", "inDropdown":"no"},
                {"Title": "The Good Dinosaur", "Year": "2015", "inDropdown":"no"},
                {"Title": "Good Night, and Good Luck.", "Year": "2005", "inDropdown":"no"},
                {"Title": "A Good Year", "Year": "2006", "inDropdown":"no"},
                {"Title": "Good Luck Chuck", "Year": "2007", "inDropdown":"no"},
                {"Title": "Good Time", "Year": "2017", "inDropdown":"no"},
                {"Title": "In Good Company", "Year": "2004", "inDropdown":"no"},
                {"Title": "All Good Things", "Year": "2010", "inDropdown":"no"},
                {"Title": "The Good Girl", "Year": "2002", "inDropdown":"no"},
                {"Title": "Alexander and the Terrible, Horrible, No Good, Very Bad Day", "Year": "2004", "inDropdown":"no"},
                {"Title": "Midnight in the Garden of Good and Evil", "Year": "1997", "inDropdown":"no"},
                {"Title": "The Good Son", "Year": "1993", "inDropdown":"no"},
                {"Title": "Now Is Good", "Year": "2012", "inDropdown":"no"}]

window.onload = function(){
    createMovieList(document.getElementById('mv1'));
}

function createMovieList(element) {
    const list = element.getElementsByClassName("list")[0];
    console.log(list.classList);
    const menu = element.getElementsByClassName("options")[0];
    const addButton = element.getElementsByClassName("add")[0];
    const input = element.getElementsByClassName("input")[0];
    const dropdown = element.getElementsByClassName("dropdown")[0];
    let movies = [];

    let createLi = function(movie){
        let todoButton = document.createElement('BUTTON');
        todoButton.appendChild(document.createElement('IMG'));
        todoButton.firstChild.src = "unticked.png";
        todoButton.className = "isviewed";
        let rmvButton = document.createElement('BUTTON');
        rmvButton.appendChild(document.createElement('IMG'));
        rmvButton.firstChild.src = "remove.png";
        rmvButton.className = "remove";
        let span = document.createElement('SPAN');
        span.appendChild(document.createTextNode(movie));
        let li = document.createElement('LI');
        li.appendChild(todoButton);
        li.appendChild(span);
        li.appendChild(rmvButton);
        li.className = "unviewed";
        return li;
    }

    let addMovie = function(movie){
        for(let i=0;i<movies.length;i++){
            if(movies[i].toLowerCase()===movie.toLowerCase()){
                alert("you already have this movie");
                return false;
            }
        }
        movies.push(movie);
        list.appendChild(createLi(movie));
        return true;
    }

    let addHandler = function(){
        if(!(input.value=== ""||input.value == null)){
            if(list.children[0].textContent === "you have no movies"){
                list.removeChild(list.children[0]);
            }
            if(addMovie(input.value)){
                input.value = "";
            }
        }
        else{
            alert("no movie to add");
        }
    }

    let setLiStatus = function(li,finalClass){
        li.style.opacity = "0";
        setTimeout(()=>{li.className = finalClass;
                        li.style.opacity = "1";},400);
    }
    
    let clickHandler = function(event){
        let button = event.target.parentNode;
        if(button.className === "isviewed"){
            event.target.src = event.target.src.endsWith("unticked.png")? "ticked.jpeg" : "unticked.png";
            if(button.parentNode.className === "unviewed"){
                if(list.className === "listUnviewed"){
                    setLiStatus(button.parentNode,"viewed");
                }
                else
                    button.parentNode.className = "viewed";
            }
            else{
                if(list.className === "listViewed"){
                    setLiStatus(button.parentNode,"unviewed")
                }
                else
                    button.parentNode.className = "viewed";
            }
        }
        if(event.target.parentNode.className === "remove"){
            let liToRemove = event.target.parentNode.parentNode;
            for(let i = 0; i<movies.length; i++){
                if(liToRemove.children[1].textContent===movies[i]){
                    while(i<movies.length-1){
                        movies[i] = movies[i+1];
                        i++;
                    }
                    movies.pop();
                }
            }
            liToRemove.style.opacity = "0";
            setTimeout(()=>{list.removeChild(liToRemove);
                        if(list.children.length===0){
                        let li = document.createElement('LI');
                        li.appendChild(document.createTextNode("you have no movies"));
                        list.appendChild(li);}},400);
        }
        if(button.className === "dropdownLi"){
            addMovie(event.target.textContent);
        }
    }


    let changeListMode = function(mode){
        if(mode === "viewed"){
            if(list.className === "listAll"){
                list.className = "allToViewed";
                setTimeout(()=>{list.className = "listViewed";},400);
            }
            else{
                list.className = "listViewed";
            }
        }
        else{
            if(list.className === "listAll"){
                list.className = "allToUnviewed";
                setTimeout(()=>{list.className = "listUnviewed";},400);
            }
            else{
                list.className = "listUnviewed";
            }
        }
    }

    let menuHandler = function(event){
        if(event.target.className.endsWith("all")){
            menu.children[0].className = "menu focused all";
            menu.children[1].className = "menu buttonViewed";
            menu.children[2].className = "menu buttonUnviewed";
            list.className = "listAll";
        }
        else if(event.target.className.endsWith("buttonUnviewed")){
            menu.children[2].className = "menu focused buttonUnviewed";
            menu.children[1].className = "menu buttonViewed";
            menu.children[0].className = "menu all";
            changeListMode("unviewed");
        }
        else{
            menu.children[1].className = "menu focused buttonViewed";
            menu.children[0].className = "menu all";
            menu.children[2].className = "menu buttonUnviewed";
            changeListMode("viewed");
        }
        
    }

    let createDropdwonli = function(movie){
        let span = document.createElement('SPAN');
        span.appendChild(document.createTextNode(movie.Title + ', ' + movie.Year));
        let li = document.createElement('LI');
        li.appendChild(span);
        li.className = "dropdownLi";
        return li;
    }

    let deleteFromDropdown = function(movie){
        for(let i=0;i<dropdown.children.length;i++){
            let title = dropdown.children[i].children[0].textContent;
            title = title.slice(0,title.lastIndexOf(','));
            if(title === movie.Title){
                dropdown.removeChild(dropdown.children[i]);
            }
        }
    }
    let inputHandler = function(){
        if(input.value!==""&&input.value!=null){
            for(let i=0; i<dataBase.length;i++){
                let name = dataBase[i].Title.toLowerCase()+", "+dataBase[i].Year;
                if(name.startsWith(input.value.toLowerCase())&&dataBase[i].inDropdown==="no"){
                    dropdown.appendChild(createDropdwonli(dataBase[i]));
                    dataBase[i].inDropdown = "yes";
                    dropdown.style.display = "block";
                }
                if(!(name.startsWith(input.value.toLowerCase()))&&dataBase[i].inDropdown==="yes"){
                    deleteFromDropdown(dataBase[i]);
                    dataBase[i].inDropdown = "no";
                }
            }
            if(dropdown.children.length===0){
                dropdown.style.display = "none";
            }
        }
        else{
            dropdown.style.display = "none";
            while(dropdown.firstChild){
                dropdown.removeChild(dropdown.firstChild);
            }
            for(let i=0; i<dataBase.length;i++){
                dataBase[i].inDropdown = "no";
            }
        }
    }
    
    
    list.addEventListener('click',clickHandler);
    addButton.addEventListener('click', addHandler);
    menu.addEventListener('click',menuHandler);
    input.addEventListener('input',inputHandler);
    dropdown.addEventListener('click',clickHandler);
}