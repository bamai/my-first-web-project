window.onload = function(){
    createMovieList(document.getElementById('mv1'));
}

function createMovieList(element) {
    const list = element.getElementsByClassName("listAll")[0];
    const menu = element.getElementsByClassName("options")[0];
    const addButton = element.getElementsByClassName("add")[0];
    const input = element.getElementsByClassName("input")[0];
    const dropdown = element.getElementsByClassName("dropdown")[0];
    let movies = [];
    let dropdownItems = [];

    let createLi = function(movie){
        let todoButton = document.createElement('BUTTON');
        todoButton.appendChild(document.createElement('IMG'));
        todoButton.firstChild.src = "unticked.png";
        todoButton.classList.add("isviewed");
        let rmvButton = document.createElement('BUTTON');
        rmvButton.appendChild(document.createElement('IMG'));
        rmvButton.firstChild.src = "remove.png";
        rmvButton.classList.add("remove");
        let span = document.createElement('SPAN');
        span.appendChild(document.createTextNode(movie));
        let li = document.createElement('LI');
        li.appendChild(todoButton);
        li.appendChild(span);
        li.appendChild(rmvButton);
        li.classList.add("unviewed");
        return li;
    }

    let movieCompare = function(movie1,movie2){
        let year1 = movie1.slice(movie1.length-4,movie1.length);
        year1 = isNaN(year1)||movie1.length<7||movie1.slice(movie1.length-6,movie1.length-4)!== ", "? null: year1;
        let year2 = movie2.slice(movie2.length-4,movie2.length);
        year2 = isNaN(year2)||movie2.length<7||movie2.slice(movie2.length-6,movie2.length-4)!==", "? null: year2;
        let equalYears = (year1===null||year2===null||year1===year2);
        title1 = year1===null? movie1: movie1.slice(0,movie1.length-6);
        title2 = year2===null? movie2: movie2.slice(0,movie2.length-6);
        return title1.toLowerCase()===title2.toLowerCase()&&equalYears;
    }

    let addMovie = function(movie){
        if(list.children[0].textContent === "you have no movies"){
            list.removeChild(list.children[0]);
        }
        for(let i=0;i<movies.length;i++){
            if(movieCompare(movie,movies[i])){
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
            if(addMovie(input.value)){
                input.value = "";
            }
        }
        else{
            alert("no movie to add");
        }
    }

    
    let clickHandler = function(event){
        let element = event.target.parentNode;
        if(element.className === "dropdownLi"||element.className === "dropdown"){
            addMovie(event.target.textContent);
        }
        else{
            if(element.className === "isviewed"){
                event.target.src = event.target.src.endsWith("unticked.png")? "ticked.jpeg" : "unticked.png";
                if(element.parentNode.className === "unviewed"){
                    if(list.className === "listUnviewed"){
                        element.parentNode.style.opacity = "0";
                        setTimeout(()=>{element.parentNode.classList.replace("unviewed","viewed");
                                        element.parentNode.style.opacity = "1";},400);
                    }
                    else
                        element.parentNode.classList.replace( "unviewed", "viewed" );
                }
                else{
                    if(list.className === "listViewed"){
                        element.parentNode.style.opacity = "0";
                        setTimeout(()=>{element.parentNode.classList.replace("viewed","unviewed");
                                        element.parentNode.style.opacity = "1";},400);
                    }
                    else
                        element.parentNode.classList.replace( "viewed", "unviewed" );
                }
            }
            if(element.className === "remove"){
                let liToRemove = element.parentNode;
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
        }
    }


    let changeListMode = function(initialMode,midMode,finalMode){
        list.classList.replace( initialMode, midMode );
        setTimeout(()=>{list.classList.replace(midMode, finalMode );},400);
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
            if(list.className === "listAll"){
                changeListMode("listAll","allToUnviewed", "listUnviewed");
            }
            else{
                list.classList.replace( "listViewed", "listUnviewed" );
            }
        }
        else{
            menu.children[1].className = "menu focused buttonViewed";
            menu.children[0].className = "menu all";
            menu.children[2].className = "menu buttonUnviewed";
            if(list.className === "listAll"){
                changeListMode("listAll","allToViewed", "listViewed");
            }
            else{
                list.classList.replace( "listUnviewed", "listViewed" );
            }
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
            let dropdownMovie = dropdown.children[i].children[0].textContent;
            if(movieCompare(dropdownMovie,movie)){
                dropdown.removeChild(dropdown.children[i]);
                break;
            }
        }
    }

    let dropdownHandler = function(database){
        database = database.Search;
        if(!database){
            dropdown.style.display = "none";
            return;
        }
        for(let i=0;i<dropdownItems.length;i++){
            let exists = false;
            for(let j=0;j<database.length;j++){
                if(movieCompare(database[j].Title+", "+database[j].Year, dropdownItems[i])){
                    exists = true;
                    break;
                }
            }
            if(!exists){
                deleteFromDropdown(dropdownItems[i]);
                dropdownItems.splice(i,1);
                i--;
            }
        }
        for(let i=0; i<database.length;i++){
            let movie = database[i].Title.toLowerCase()+", "+database[i].Year;
            if(!dropdownItems.includes(movie)){
                dropdown.appendChild(createDropdwonli(database[i]));
                dropdownItems.push(movie);
            }
            dropdown.style.display = "block";
        }
        if(dropdownItems.length===0){
            dropdown.style.display = "none";
        }
        else{
            dropdown.lastChild.style.border = "none";
        }
    }
    
    let inputHandler = function(){
        if(input.value!==""&&input.value!=null){
            fetch('http://www.omdbapi.com/?apikey=56dbe3cf&s='+input.value.replace(" ","+")+'&type=movie&r=json')
                .then(function(response){
                    if (response.status !== 200) {
                        dropdown.style.display = "none";
                        return;
                    }
                    response.json().then((data)=>{dropdownHandler(data);});
                })
                .catch(function(){
                    dropdown.style.display = "none";
                })
        }
    }

    let hideDropdown = function(event){
        if(event.target!==dropdown||event.target.parentNode!==dropdown||event.target.parentNode.parentNode!==dropdown){
            dropdown.style.display = "none";
        }
    }
    
    
    list.addEventListener('click',clickHandler);
    addButton.addEventListener('click', addHandler);
    menu.addEventListener('click',menuHandler);
    input.addEventListener('input',inputHandler);
    dropdown.addEventListener('click',clickHandler);
    element.addEventListener('click',hideDropdown);
}