import {actions} from './actions.js'

const movieCompare = (movie1,movie2) => {
    let year1 = movie1.slice(movie1.length-4,movie1.length);
    year1 = isNaN(year1)||movie1.length<7||movie1.slice(movie1.length-6,movie1.length-4)!== ", "? null: year1;
    let year2 = movie2.slice(movie2.length-4,movie2.length);
    year2 = isNaN(year2)||movie2.length<7||movie2.slice(movie2.length-6,movie2.length-4)!==", "? null: year2;
    let equalYears = (year1===null||year2===null||year1===year2);
    let title1 = year1===null? movie1: movie1.slice(0,movie1.length-6);
    let title2 = year2===null? movie2: movie2.slice(0,movie2.length-6);
    return title1.toLowerCase()===title2.toLowerCase()&&equalYears;
}

export const moviesListReducer = (state={movies: []}, action)=>{
    switch(action.type){
        case actions.ADD_MOVIE:
            if(action.name===undefined||action.name===""){
                alert("No movie to add");
                return state;
            }
            const movies = state.movies
            for(let i=0;i<movies.length;i++){
                if(movieCompare(action.name,movies[i].name)){
                    alert("you already have this movie");
                    return state;
                }
            }
            return Object.assign({},state,{movies: [...state.movies, {name: action.name, className: "unviewed"}]});
        case actions.DELETE_MOVIE:
            return Object.assign({},state,{movies: state.movies.filter((movie)=>{
                    return !movieCompare(movie.name, action.name);},this)});
        case actions.HIDE_LI:
            return Object.assign({}, state,{movies: state.movies.map((movie)=>{
                    if(!movieCompare(movie.name,action.name)){
                        return movie;
                    }
                    else{
                        let className = movie.className==="viewed"? "viewedDisappears": "unviewedDisappears";
                        return Object.assign({},movie,{className: className});
                    };},this)});
        case actions.TOGGLE_LI:
            return Object.assign({}, state,{movies: state.movies.map((movie)=>{
                    if(!movieCompare(movie.name ,action.name)){
                        return movie;
                    }
                    else{
                        let className = movie.className === "unviewed"|| movie.className ==="unviewedDisappears"? "viewed": "unviewed";
                        return Object.assign({},movie,{className: className});
                    };},this)});
        default:
            return state;
    }
}

export const optionsReducer = (state={allName: "menu focused all", viewedName: "menu buttonViewed", unviewedName: "menu buttonUnviewed", listName: "listAll"}, action)=>{
    if(action.type===actions.CHANGE_OPTION_FILTER){
        if(action.nextFilter==="all"){
            return {allName: "menu focused all", viewedName: "menu buttonViewed", unviewedName: "menu buttonUnviewed", listName: "listAll",}
        }
        else if (action.nextFilter==="unviewed"){
            return { allName: "menu all", viewedName: "menu buttonViewed", unviewedName: "menu focused buttonUnviewed", listName: "listUnviewed"}
        }
        else if (action.nextFilter==="viewed"){
            return { allName: "menu all", viewedName: "menu focused buttonViewed", unviewedName: "menu buttonUnviewed", listName: "listViewed"}
        }
        else if (action.nextFilter==="allToUnviewed"){
            return { allName: "menu all", viewedName: "menu buttonViewed", unviewedName: "menu focused buttonUnviewed", listName: "allToUnviewed"}
        }
        else{
            return { allName: "menu all", viewedName: "menu focused buttonViewed", unviewedName: "menu buttonUnviewed", listName: "allToViewed"}
        }
    }
    else{
        return state
    }
}

export const addMovieReducer = (state={ dropdownChildren: [], displayDropdown: false, inputValue: ""}, action) => {
    switch(action.type){
        case actions.SET_INPUT_VALUE:
            return Object.assign({},state, {inputValue: action.value});
        case actions.SET_DISPLAY_DROPDOWN:
            return Object.assign({},state, {displayDropdown: action.displayDropdown});
        case actions.SET_DROPDOWN_CHILDREN:
            return Object.assign({},state, {dropdownChildren: action.dropdownChildren});
        case actions.CLOSE_DROPDOWN:
            return Object.assign({},state, {displayDropdown: false});
        default:
            return state;
    }
}


