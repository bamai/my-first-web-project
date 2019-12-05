import React from 'react';
class DropdownLi extends React.Component{
    render(){
        return(
            <li className = "dropdownLi" onClick={this.props.onClick}><span>{this.props.title + ", " + this.props.year}</span></li>
        )
    }
}

class Dropdown extends React.Component{
    render(){
        if(this.props.children.length===0||!this.props.displayDropdown){
            return null;
        }
        console.log(this.props.children);
        return(
        <ul className = "dropdown">{this.props.children.map((movie,index)=>{
            return (<DropdownLi key={index} title={movie.Title} year={movie.Year} onClick={this.props.onClick}/>);
        },this)}</ul>
        );
    }
}


class AddMovie extends React.Component{
    render(){
        return(
            <div className = "addMovie">
                <input type = "text" className = "input" placeholder = "search a movie" onChange = {this.props.onChange}/>
                <button className = "add" onClick = {this.props.onClick}>add</button>
                <Dropdown children={this.props.dropdownChildren} displayDropdown={this.props.displayDropdown} onClick={this.props.onClick}/>
            </div>
        );
    }
}
export default AddMovie;