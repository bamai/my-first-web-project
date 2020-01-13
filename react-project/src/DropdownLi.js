import React from 'react';

class DropdownLi extends React.Component{
    render(){
        return(
            <li className = "dropdownLi" onClick={this.props.onClick}><span>{this.props.title + ", " + this.props.year}</span></li>
        )
    }
}

export default DropdownLi;