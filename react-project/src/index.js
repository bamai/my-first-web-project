import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import './index.css';
import MovieWatchList from './MovieWatchList';
import { combineReducers, createStore } from 'redux';
import {optionsReducer, moviesListReducer, addMovieReducer} from './reducers.js';

const rootReducer = combineReducers({ moviesListReducer, optionsReducer, addMovieReducer})

const store = createStore(rootReducer);

export default store;

ReactDOM.render(
        <Provider store={store}>
            <MovieWatchList />
        </Provider>,
        document.getElementById('root'));
