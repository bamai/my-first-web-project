import React from 'react';
import DropdownLi from './DropdownLi';

class Dropdown extends React.Component{
    render(){
        if(!this.props.children||this.props.children.length===0||!this.props.displayDropdown){
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

export default Dropdown;