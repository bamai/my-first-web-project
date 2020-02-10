import React, { Component } from 'react';
import AddMovie from './AddMovie.js';
import DisplayOptions from './DisplayOptions.js';
import MoviesList from './MoviesList.js';
import {closeDropdown, addMovie, handleInputChange, changeOption, handleListActions} from './actions.js'
import {connect} from 'react-redux'

const mapStateToProps = state => {
    return {
        displayDropdown: state.addMovieReducer.displayDropdown,
        dropdownChildren: state.addMovieReducer.dropdownChildren,        
        inputValue: state.addMovieReducer.inputValue,
        allName: state.optionsReducer.allName,
        viewedName: state.optionsReducer.viewedName,
        unviewedName: state.optionsReducer.unviewedName,
        listName: state.optionsReducer.listName,
        movies: state.moviesListReducer.movies,
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
        onAddMovieClick: (target, inputValue) => {
            let movie;
            if(target.className==="add"){
                movie = inputValue;
            }
            else{
                movie = target.children[0]===undefined? target.textContent: target.children[0].textContent;
            }
            dispatch(addMovie(movie))
        },
        onInputChange: (inputValue)=>{
            dispatch(handleInputChange(inputValue));
        },
        onFilterChange:  (target, listName)=>{
            console.log(listName);
            let nextFilter = target.className.endsWith("Unviewed")? "unviewed" : target.className.endsWith("Viewed")? "viewed" : "all";
            dispatch(changeOption(nextFilter, listName))
        },
        onListClick: (target, listName)=>{
            dispatch(handleListActions(target, listName))
        },
        onGlobalClick: (target)=>{
            dispatch(closeDropdown(target))
        }
    }
  }
export class MovieWatchList extends Component {
    render(){
        return (<div className="movieWatchList" onClick={(event)=>{this.props.onGlobalClick(event.target)}}>
            <h1>My Movie Watch List</h1>
            <AddMovie onClick={(event)=>this.props.onAddMovieClick(event.target,this.props.inputValue)} 
                    onChange={(event)=>{this.props.onInputChange(event.target.value);}}
                    displayDropdown={this.props.displayDropdown}
                    dropdownChildren={this.props.dropdownChildren}
                    inputValue={this.props.inputValue}/>
            <DisplayOptions allName={this.props.allName}
                    viewedName={this.props.viewedName}
                    unviewedName={this.props.unviewedName}
                    onClick={(event)=>{this.props.onFilterChange(event.target, this.props.listName);}} />
            <MoviesList listName={this.props.listName}
                    movies={this.props.movies}
                    onClick={(event)=>this.props.onListClick(event.target, this.props.listName)}/>
            </div>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieWatchList);