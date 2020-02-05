import React from 'react';
import Dropdown from './Dropdown';

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
export default AddMovie