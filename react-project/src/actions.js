const actions = {
    ADD_MOVIE: 'ADD_MOVIE',
    REMOVE_MOVIE: 'REMOVE_MOVIE',
    TOGGLE_MOVIE: 'TOGGLE_MOVIE',
    HIDE_LI: 'HIDE_LI',
}

export function addMovie(name){
    return {type: actions.ADD_MOVIE, name: name}
}

export function removeMovie(name){
    return {type: actions.REMOVE_MOVIE, name: name}
}

export function toggleMovie(name){
    return {type: actions.TOGGLE_MOVIE, name: name}
}

export function hideLi(name){
    return {type: actions.HIDE_LI, name: name}
}

