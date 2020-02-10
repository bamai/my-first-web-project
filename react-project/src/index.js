import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import './index.css';
import MovieWatchList from './MovieWatchList';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import {optionsReducer, moviesListReducer, addMovieReducer} from './reducers.js';

const rootReducer = combineReducers({ moviesListReducer, optionsReducer, addMovieReducer});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;

ReactDOM.render(
        <Provider store={store}>
            <MovieWatchList />
        </Provider>,
        document.getElementById('root'));
