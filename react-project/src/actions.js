export const actions = {
    ADD_MOVIE: 'ADD_MOVIE',
    DELETE_MOVIE: 'DELETE_MOVIE',
    TOGGLE_LI: 'TOGGLE_LI',
    HIDE_LI: 'HIDE_LI',
    CHANGE_OPTION_FILTER: 'CHANGE_OPTION_FILTER',
    SET_INPUT_VALUE: 'SET_INPUT_VALUE',
    SET_DISPLAY_DROPDOWN: 'SET_DISPLAY_DROPDOWN',
    SET_DROPDOWN_CHILDREN: 'SET_DROPDOWN_CHILDREN',
    CLOSE_DROPDOWN: 'CLOSE_DROPDOWN',
}

export function addMovie(name){
    return {type: actions.ADD_MOVIE, name: name};
}

export function deleteMovie(name){
    return {type: actions.DELETE_MOVIE, name: name};
}

export function toggleLi(name){
    return {type: actions.TOGGLE_MOVIE, name: name};
}

export function hideLi(name){
    return {type: actions.HIDE_LI, name: name};
}

export function removeMovie(name){
    return function(dispatch){
        dispatch(hideLi(name));
        setTimeout(()=>{return dispatch(deleteMovie(name))}, 400);
    }
}

export function toggleMovie(name, listName){
    return function(dispatch){
        if(listName==="listViewed"||listName==="listUnViewed"){
            dispatch(hideLi(name));
            setTimeout(()=>{return dispatch(toggleLi(name))}, 400);
        }
        return dispatch(toggleLi(name));
    }
}

export function handleListActions(eventTarget, listName){
    return function(dispatch){
        if(eventTarget.className.endsWith("remove")){
            dispatch(removeMovie(eventTarget.previousSibling.textContent));
        }
        else{
            dispatch(toggleMovie(eventTarget.previousSibling.textContent,listName));
        }
    }
}
export function changeOptionFilter(nextFilter){
    return {type: actions.CHANGE_OPTION_FILTER, nextFilter};
}

export function changeOption(eventTarget, listName){
    let nextFilter = eventTarget.className.endsWith("all")? "all" : eventTarget.className.endsWith("unviewed")? "unviewed" : "viewed";
    return function(dispatch){
        if(listName==="all"){
            if(nextFilter==="unviewed"){
                dispatch(changeOptionFilter("allToUnviewed"));
                setTimeout(()=>(dispatch(changeOptionFilter("unviewed"))),400);
            }
            else{
                dispatch(changeOptionFilter("unviewed"));
            }
            if(nextFilter==="viewed"){
                dispatch(changeOptionFilter("allToViewed"));
                setTimeout(()=>(dispatch(changeOptionFilter("viewed"))),400);
            }
            else{
                dispatch(changeOptionFilter("viewed"));
            }
        }
        else{
            dispatch(changeOptionFilter(nextFilter));
        }
    }
}

export function setInputValue(inputValue){
    return {type: actions.SET_INPUT_VALUE, value: inputValue};
}

export function setDisplayDropdown(displayDropdown){
    return {type: actions.SET_DISPLAY_DROPDOWN, displayDropdown: displayDropdown};
}

export function setDropdownChildren(dropdownChildren){
    return {type: actions.SET_DROPDOWN_CHILDREN, dropdownChildren: dropdownChildren};
}

export function handleInputChange(inputValue){
    return function(dispatch){
        dispatch(setInputValue(inputValue));
        if(inputValue!==""&&inputValue!=null){
            fetch('http://www.omdbapi.com/?apikey=56dbe3cf&s='+inputValue.replace(" ","+")+'&type=movie&r=json')
                .then((response)=>{
                    if (response.status !== 200) {
                        dispatch(setDisplayDropdown(false));
                        return;
                    }
                    response.json().then((data)=>{ 
                        data = data.Search;
                        if(!data){
                            dispatch(setDisplayDropdown(false));
                        }
                        else{
                            setDropdownChildren(data);
                            dispatch(setDisplayDropdown(true)); 
                        }
                });})
                .catch(()=>{
                    dispatch(setDisplayDropdown(false));
                })
        }
    }
}

export function handleMovieAddition(event){
    return function(dispatch){
        let movie;
        if(event.target.className==="add"){
            movie = this.state.input;
        }
        else{
            movie = event.target.children[0]===undefined? event.target.textContent: event.target.children[0].textContent;
        }
        dispatch(addMovie(movie));
    }
}

export function closeDropdown(eventTarget){
    return {type: actions.CLOSE_DROPDOWN, event: eventTarget}
}

