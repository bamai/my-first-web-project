import React, { Component } from 'react';
import AddMovie from './AddMovie.js';
import DisplayOptions from './DisplayOptions.js';
import MoviesList from './MoviesList.js';
import {closeDropdown, handleMovieAddition, handleInputChange, changeOption, handleListActions} from './actions.js'
import store from './index.js'





class MovieWatchList extends Component {
    render(){
        return (<div className="movieWatchList" onClick={(event)=>{store.dispatch(closeDropdown(event.target))}}>
            <h1>My Movie Watch List</h1>
            <AddMovie onClick={(event)=>{store.dispatch(handleMovieAddition(event))}} onChange={(event)=>{store.dispatch(handleInputChange(event.target.value))}}
            displayDropdown={store.getState().displayDropdown} dropdownChildren={store.getState().dropdownChildren}/>
            <DisplayOptions allName={store.getState().allName} viewedName={store.getState().viewedName}
            unviewedName={store.getState().unviewedName} onClick={(event)=>{store.dispatch(changeOption((event.target, store.getState().listName)))}} />
            <MoviesList listName={store.getState().listName} movies={store.getState().movies} onClick={(event)=>store.dispatch(handleListActions(event.target, store.getState().listName))}/>
            </div>);
    }
}

  export default MovieWatchList