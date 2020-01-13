import React, { Component } from 'react';
import AddMovie from './AddMovie';
import DisplayOptions from './DisplayOptions';
import MoviesList from './MoviesList';

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
            dropdownChildren: [],
            database: [{"Title": "Good Will Hunting", "Year": "1997"},
                        {"Title": "The Good, the Bad and the Ugly", "Year": "1966"},
                        {"Title": "As Good as It Gets", "Year": "1997"},
                        {"Title": "A Few Good Men", "Year": "1992"},
                        {"Title": "A Good Day to Die Hard", "Year": "2013"},
                        {"Title": "Good Bye Lenin!", "Year": "2003"},
                        {"Title": "Good Morning, Vietnam", "Year": "1987"},
                        {"Title": "The Good Shepherd", "Year": "2006"},
                        {"Title": "The Good Dinosaur", "Year": "2015"},
                        {"Title": "Good Night, and Good Luck.", "Year": "2005"},
                        {"Title": "A Good Year", "Year": "2006"},
                        {"Title": "Good Luck Chuck", "Year": "2007"},
                        {"Title": "Good Time", "Year": "2017"},
                        {"Title": "In Good Company", "Year": "2004"},
                        {"Title": "All Good Things", "Year": "2010"},
                        {"Title": "The Good Girl", "Year": "2002", "inDropdown":"no"},
                        {"Title": "Alexander and the Terrible, Horrible, No Good, Very Bad Day", "Year": "2004"},
                        {"Title": "Midnight in the Garden of Good and Evil", "Year": "1997"},
                        {"Title": "The Good Son", "Year": "1993"},
                        {"Title": "Tow Is Good", "Year": "2012"},
                        {"Title": "Tjw Is Good", "Year": "2012"},
                        {"Title": "Ttw Is Good", "Year": "2012"},
                        {"Title": "pow Is Good", "Year": "2012"}]

        };
        this.handleOptions = this.handleOptions.bind(this);
        this.changeListMode = this.changeListMode.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleListClick = this.handleListClick.bind(this);
        this.handleGeneralClick = this.handleGeneralClick.bind(this);
    }
    
    handleInput(event){
        this.setState({input: event.target.value,
                        dropdownChildren: this.state.database.filter((movie)=>{
                                                let movieName = movie.Title.toLowerCase();
                                                let input = event.target.value.toLowerCase()
                                                return input!==""&&input!==undefined&&movieName.startsWith(input)}
                                                ,this),
                displayDropdown: event.target.value!==""&&event.target.value!==undefined});
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

    movieCompare(movie1,movie2){
        let year1 = movie1.slice(movie1.length-4,movie1.length);
        year1 = isNaN(year1)||movie1.length<7||movie1.slice(movie1.length-6,movie1.length-4)!== ", "? null: year1;
        let year2 = movie2.slice(movie2.length-4,movie2.length);
        year2 = isNaN(year2)||movie2.length<7||movie2.slice(movie2.length-6,movie2.length-4)!==", "? null: year2;
        let equalYears = (year1===null||year2===null||year1===year2);
        let title1 = year1===null? movie1: movie1.slice(0,movie1.length-6);
        let title2 = year2===null? movie2: movie2.slice(0,movie2.length-6);
        return title1.toLowerCase()===title2.toLowerCase()&&equalYears;
    }

    handleAddClick(event){
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
        for(let i=0;i<this.state.movies.length;i++){
            if(this.movieCompare(movie,this.state.movies[i].name)){
                alert("you already have this movie");
                return;
            }
        }
        this.setState({movies: this.state.movies.concat([{"name":movie,"className":"unviewed"}])
        })
    }

    handleListClick(event){
        let button = event.target.parentNode;
        if(button.className === "isviewed"){
            if(button.parentNode.className === "unviewed"){
                if(this.state.listName === "listUnviewed"){
                    button.parentNode.style.opacity = "0";
                    setTimeout(()=>{this.setState({
                        movies: this.state.movies.map((movie)=>{
                            if(movie.name===button.nextSibling.textContent){
                                return {name: movie.name, className: "viewed"};
                            }
                            else{
                                return {name: movie.name, className: movie.className};
                            }
                        },this)
                    });
                    button.parentNode.style.opacity = "1";},400);
                }
                else{
                    this.setState({
                        movies: this.state.movies.map((movie)=>{
                            if(movie.name===button.nextSibling.textContent){
                                return {name: movie.name, className: "viewed"};
                            }
                            else{
                                return {name: movie.name, className: movie.className};
                            }})});
                }
            }
            else{
                if(this.state.listName === "listViewed"){
                    button.parentNode.style.opacity = "0";
                    setTimeout(()=>{this.setState({
                        movies: this.state.movies.map((movie)=>{
                            if(movie.name===button.nextSibling.textContent){
                                return {name: movie.name, className: "unviewed"};
                            }
                            else{
                                return {name: movie.name, className: movie.className};
                            }
                        },this)
                    });
                    button.parentNode.style.opacity = "1";},400);
                }
                else{
                    this.setState({
                        movies: this.state.movies.map((movie)=>{
                            if(movie.name===button.nextSibling.textContent){
                                return {name: movie.name, className: "unviewed"};
                            }
                            else{
                                return {name: movie.name, className: movie.className};
                            }})});
                }
            }
        }
        if(button.className === "remove"){
            let movieToRemove = button.previousSibling.textContent;
            button.parentNode.style.opacity = "0";
            setTimeout(()=>{this.setState({
                movies: this.state.movies.filter((movie)=>{
                    return movie.name!==movieToRemove;},this)});
                    button.parentNode.style.opacity = "1";},400);
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