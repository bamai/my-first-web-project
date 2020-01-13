import React from 'react'
class DisplayOptions extends React.Component{
    render(){
        return(
            <div role = "tablist" className = "options" onClick={this.props.onClick}>
                <button role = "tab" className = {this.props.allName}>All</button>
                <button role = "tab" className= {this.props.viewedName}>Veiwed</button>
                <button role = "tab" className = {this.props.unviewedName}>Unviewed</button>
            </div>
        );
    }
}

export default DisplayOptions;