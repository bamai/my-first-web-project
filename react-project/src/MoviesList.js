import React from 'react';
import './MoviesList.css';

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