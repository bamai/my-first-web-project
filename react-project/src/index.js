import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MovieWatchList from './MovieWatchList';

class App extends React.Component{
    render(){
        return(
        <div className = "App">
            <MovieWatchList />
        </div>);
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
