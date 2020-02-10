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

export function deleteMovie(name, className){
    return {type: actions.DELETE_MOVIE, name: name, className: className};
}

export function toggleLi(name){
    return {type: actions.TOGGLE_LI, name: name};
}

export function hideLi(name, className){
    return {type: actions.HIDE_LI, name: name, className};
}

export function removeMovie(name, className){
    return function(dispatch){
        dispatch(hideLi(name, className));
        setTimeout(()=>{dispatch(deleteMovie(name, className))}, 400, dispatch);
    }
}

export function toggleMovie(name, listName, className){
    return function(dispatch){
        if(listName==="listViewed"||listName==="listUnviewed"){
            dispatch(hideLi(name, className));
            setTimeout(()=>{dispatch(toggleLi(name))}, 400);
        }
        else{
            dispatch(toggleLi(name));
        }
    }
}

export function handleListActions(eventTarget, listName){
    return function(dispatch){
        if(eventTarget.parentNode.className.endsWith("remove")){
            return dispatch(removeMovie(eventTarget.parentNode.previousSibling.textContent, eventTarget.parentNode.parentNode.className));
        }
        else if(eventTarget.parentNode.className.endsWith("isviewed")){
            return dispatch(toggleMovie(eventTarget.parentNode.nextSibling.textContent,listName, eventTarget.parentNode.parentNode.className));
        }
    }
}
export function changeOptionFilter(nextFilter){
    return {type: actions.CHANGE_OPTION_FILTER, nextFilter};
}

export function changeOption(nextFilter, listName){
    return function(dispatch){
        if(listName.endsWith("listAll")){
            if(nextFilter==="unviewed"){
                dispatch(changeOptionFilter("allToUnviewed"));
                setTimeout(()=>(dispatch(changeOptionFilter("unviewed"))),400);
            }
            if(nextFilter==="viewed"){
                dispatch(changeOptionFilter("allToViewed"));
                setTimeout(()=>(dispatch(changeOptionFilter("viewed"))),400);
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
                            dispatch(setDropdownChildren(data));
                            dispatch(setDisplayDropdown(true)); 
                        }
                });})
                .catch(()=>{
                    dispatch(setDisplayDropdown(false));
                })
        }
    }
}

export function closeDropdown(eventTarget){
    return {type: actions.CLOSE_DROPDOWN, event: eventTarget}
}

