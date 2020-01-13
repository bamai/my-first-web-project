import React from 'react';
import './MoviesList.css';
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

const hideLi = (movieName) => {
    {
        {movies: store.gerState.movies.map((movie)=>{
            if(movieCompare()){
                return {name: movie.name, className: "disappears"};
            }
            else{
                return {name: movie.name, className: movie.className};
            }
        },this)};
}

const MoviesListReducer = (state=[], action)=>{
    switch(action.type){
        case actions.ADD_MOVIE:
            const movies = store.getState().movies
            for(let i=0;i<movies.length;i++){
                if(movieCompare(movie,this.state.movies[i].name)){
                    alert("you already have this movie");
                    return;
                }
            }
            return Object.assign({},state, {movies: [...state.movies, {name: action.name, className: "unviewed"}]});
        case actions.REMOVE_MOVIE:
            hideLi(action.name);
            setTimeout(()=>{return ({
                movies: this.state.movies.filter((movie)=>{
                    return movie.name!==movieToRemove;},this)});},400);
            return Object.assign({},state, {movies: [...state.movies.filter()]});
    }

}

class MoviesList extends React.Component{
    render(){
        let unticked = "https://icon-library.net/images/unchecked-checkbox-icon/unchecked-checkbox-icon-10.jpg";
        let ticked = "http://www.clker.com/cliparts/z/Q/9/Y/Q/M/checkbox-checked-hi.png";
        let remove = "https://www.clipartmax.com/png/middle/142-1421780_wrong-red-cross-mark-transparent.png";
        if(this.props.movies.length===0){
            return(<div role="tabpanel" className = {this.props.listName}>
            <ul>
                <li key="0"><span>You have no movies</span></li>
            </ul>
        </div>);
        }
        return(
            <div role="tabpanel" className = {this.props.listName}>
                <ul>
                    {this.props.movies.map((movie,index)=>{
                        let src = movie.className==="unviewed"? unticked: ticked;
                    return (<li key={index} className={movie.className} onClick={this.props.onClick}><button className = "isviewed"><img src ={src} alt = "checkbox"/></button><span>{movie.name}</span><button className = "remove"><img src = {remove} alt = "remove"/></button></li>);})}
                </ul>
            </div>
        );
    }
}

export default MoviesList;