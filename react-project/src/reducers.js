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

export const moviesListReducer = (state=[], action)=>{
    switch(action.type){
        case actions.ADD_MOVIE:
            if(action.name===undefined||action.name===""){
                alert("No movie to add");
                return;
            }
            const movies = state.movies
            for(let i=0;i<movies.length;i++){
                if(movieCompare(action.name,movies[i].name)){
                    alert("you already have this movie");
                    return;
                }
            }
            return Object.assign({},state, {movies: [...state.movies, {name: action.name, className: "unviewed"}]});
        case actions.REMOVE_MOVIE:
            return Object.assign({},state,{
                movies: state.movies.filter((movie)=>{
                    return !movieCompare(movie.name, action.name);},this)});
        case actions.HIDE_LI:
            return Object.assign({},state,{
                movies: state.movies.map((movie)=>{
                    if(movieCompare(movie.name,action.name)){
                        return movie;
                    }
                    else{
                       return Object.assign({},movie,{className: "disappears"});
                    };},this)});
        case actions.TOGGLE_MOVIE:
            return Object.assign({},state,{
                    movies: state.movies.map((movie)=>{
                    if(movieCompare(movie.name ,action.name)){
                        return movie;
                    }
                    else{
                        let className = movie.className === "unviewed"? "viewed": "unviewed";
                       return Object.assign({},movie,{className: className});
                    };},this)});
        default:
            return state;
    }
}

export const optionsReducer = (state={listName: "listAll", allName: "menu focused all", viewedName: "menu buttonViewed", unviewedName: "menu buttonUnviewed",}, action)=>{
    if(action.type===actions.CHANGE_OPTION_FILTER){
        if(action.nextFilet==="all"){
            return {allName: "menu focused all", viewedName: "menu buttonViewed", unviewedName: "menu buttonUnviewed", listName: "listAll",}
        }
        else if (action.nextFilet==="unviewed"){
            return { allName: "menu all", viewedName: "menu buttonViewed", unviewedName: "menu focused buttonUnviewed", listName: "listUnviewed"}
        }
        else if (action.nextFilet==="viewed"){
            return { allName: "menu all", viewedName: "menu buttonViewed", unviewedName: "menu focused buttonUnviewed", listName: "viewed"}
        }
        else if (action.nextFilet==="allToUnviewed"){
            return { allName: "menu all", viewedName: "menu buttonViewed", unviewedName: "menu focused buttonUnviewed", listName: "allToUnviewed"}
        }
        else if (action.nextFilet==="allToViewed"){
            return { allName: "menu all", viewedName: "menu buttonViewed", unviewedName: "menu focused buttonUnviewed", listName: "allToViewed"}
        }
    }
    else{
        return state
    }
}

export const addMovieReducer = (state={ dropdownChildren: [], displayDropdown: false, inputValue: ""}, action) => {
    switch(actions.type){
        case actions.SET_INPUT_VALUE:
            return Object.assign({},state, {inputValue: action.value});
        case actions.SET_DISPLAY_DROPDOWN:
            return Object.assign({},state, {displayDropdown: action.displatDropdown});
        case actions.SET_DROPDOWN_CHILDREN:
            return Object.assign({},state, {dropdownChildren: action.dropDownChildren});
        case actions.CLOSE_DROPDOWN:
            return Object.assign({},state, {displayDropdown: false});
        default:
            return state;
    }
}


