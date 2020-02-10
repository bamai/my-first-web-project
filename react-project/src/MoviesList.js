import React from 'react';
import './MoviesList.css';

class MoviesList extends React.Component{
    render(){
        let unticked = "https://icon-library.net/images/unchecked-checkbox-icon/unchecked-checkbox-icon-10.jpg";
        let ticked = "http://www.clker.com/cliparts/z/Q/9/Y/Q/M/checkbox-checked-hi.png";
        let remove = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ1EuBchSmUd_5HSuUcnqUOBNMH56sLgfFz-l_CdW9h9fqP8b2i";
        if(!this.props.movies||this.props.movies.length===0){
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
                        if(movie){
                            let src = movie.className==="unviewed"? unticked: ticked;
                            return (<li key={index} className={movie.className} onClick={this.props.onClick}>
                                <button className = "isviewed">
                                    <img src ={src} alt = "checkbox"/>
                                </button>
                                <span>{movie.name}</span>
                                <button className = "remove"><img src = {remove} alt = "remove"/></button></li>);}})}
                </ul>
            </div>
        );
    }
}

export default MoviesList;