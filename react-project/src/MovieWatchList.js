import React, { Component } from 'react';
import AddMovie from './AddMovie';
import DisplayOptions from './DisplayOptions';
import MoviesList from './MoviesList';



const rootReducer = (state, action)=>{

}







class MovieWatchList extends Component {
    constructor(props){
        super(props);
        this.state = {
            movies: [],
            allName: "menu focused all",
            viewedName: "menu buttonViewed",
            unviewedName: "menu buttonUnviewed",
            listName: "listAll",
            input: undefined,
            displayDropdown: false,
            dropdownChildren: []
        };
        this.handleOptions = this.handleOptions.bind(this);
        this.changeListMode = this.changeListMode.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleListClick = this.handleListClick.bind(this);
        this.handleGeneralClick = this.handleGeneralClick.bind(this);
        this.hideLi = this.hideLi.bind(this);
        this.updateMovies = this.updateMovies.bind(this);
    }
    
    
    handleInput(event){
        if(event.target.value!==""&&event.target.value!=null){
            this.setState({input: event.target.value});
            fetch('http://www.omdbapi.com/?apikey=56dbe3cf&s='+event.target.value.replace(" ","+")+'&type=movie&r=json')
                .then((response)=>{
                    if (response.status !== 200) {
                        this.setState({displayDropdown: false});
                        return;
                    }
                    response.json().then((data)=>{  data = data.Search;
                                                    if(!data){
                                                        this.setState({displayDropdown: false});
                                                    }
                                                    else{
                                                        this.setState({dropdownChildren: data,
                                                            displayDropdown: true});} 
                                                    }
                                                );})
                .catch(function(){
                    this.setState({displayDropdown: false});
                })
        }
    }
    changeListMode(midMode, finalMode){
        this.setState({ listName: midMode });
        setTimeout(() => { this.setState({ listName: finalMode }); }, 400);
    }
    handleOptions(event){
        if (event.target.className.endsWith("all")) {
            this.setState({
                allName: "menu focused all",
                viewedName: "menu buttonViewed",
                unviewedName: "menu buttonUnviewed",
                listName: "listAll"
            });
        }
        else if (event.target.className.endsWith("buttonUnviewed")) {
            this.setState({
                allName: "menu all",
                viewedName: "menu buttonViewed",
                unviewedName: "menu focused buttonUnviewed"
            });
            if (this.state.listName === "listAll") {
                this.changeListMode("allToUnviewed", "listUnviewed");
            }
            else {
                this.setState({ listName: "listUnviewed" });
            }
        }
        else {
            this.setState({
                allName: "menu all",
                viewedName: "menu focused buttonViewed",
                unviewedName: "menu buttonUnviewed"
            });
            if (this.state.listName === "listAll") {
                this.changeListMode("allToViewed", "listViewed");
            }
            else {
                this.setState({ listName: "listViewed" });
            }
        }
    }

    

    /*handleAddClick(event){
        let movie;
        if(event.target.className==="add"){
            if(this.state.input===undefined||this.state.input===""){
                alert("No movie to add");
                return;
            }
            movie = this.state.input;
        }
        else{
            movie = event.target.children[0]===undefined? event.target.textContent: event.target.children[0].textContent;
        }
        
        this.setState({movies: this.state.movies.concat([{"name":movie,"className":"unviewed"}])
        })
    }*/

    hideLi(movieName){
        this.setState({
            movies: this.state.movies.map((movie)=>{
                if(movie.name===movieName){
                    return {name: movie.name, className: "disappears"};
                }
                else{
                    return {name: movie.name, className: movie.className};
                }
            },this)});
    }

    updateMovies(movieName, finalResult){
        this.setState({
            movies: this.state.movies.map((movie)=>{
                if(movie.name===movieName){
                    return {name: movie.name, className: finalResult};
                }
                else{
                    return {name: movie.name, className: movie.className};
                }
            },this)});
    }

    handleListClick(event){
        let button = event.target.parentNode;
        if(button.className === "isviewed"){
            if(button.parentNode.className === "unviewed"){
                if(this.state.listName === "listUnviewed"){
                    this.hideLi(button.nextSibling.textContent);
                    setTimeout(()=>{this.updateMovies(button.nextSibling.textContent,"viewed")},400);
                }
                else{
                    this.updateMovies(button.nextSibling.textContent,"viewed");
                }
            }
            else{
                if(this.state.listName === "listViewed"){
                    this.hideLi(button.nextSibling.textContent);
                    setTimeout(()=>{this.updateMovies(button.nextSibling.textContent,"unviewed")},400);
                }
                else{
                    this.updateMovies(button.nextSibling.textContent,"unviewed");
                }
            }
        }
        if(button.className === "remove"){
            let movieToRemove = button.previousSibling.textContent;
            this.hideLi(button.previousSibling.textContent);
            setTimeout(()=>{this.setState({
                movies: this.state.movies.filter((movie)=>{
                    return movie.name!==movieToRemove;},this)});},400);
        }
    }

    handleGeneralClick(event){
        if(!(event.target.className==="dropdown"||event.target.className==="dropdownLi"||event.target.parentNode.className==="dropdownLi"
            ||event.target.className==="input"||event.target.className==="add")){
            this.setState({displayDropdown: false});
        }
    }

    render(){
        return (<div className="movieWatchList" onClick={this.handleGeneralClick}>
            <h1>My Movie Watch List</h1>
            <AddMovie onClick={this.handleAddClick} onChange={this.handleInput} displayDropdown={this.state.displayDropdown} dropdownChildren={this.state.dropdownChildren}/>
            <DisplayOptions allName={this.state.allName} viewedName={this.state.viewedName} unviewedName={this.state.unviewedName} onClick={this.handleOptions} />
            <MoviesList listName={this.state.listName} movies={this.state.movies} onClick={this.handleListClick}/>
            </div>);
    }
}

  export default MovieWatchList