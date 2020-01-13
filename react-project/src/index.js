import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import './index.css';
import {MovieWatchList, rootReducer} from './MovieWatchList';

const store = createStore(rootReducer)

ReactDOM.render(
        <Provider store={store}>
            <MovieWatchList />
        </Provider>,
        document.getElementById('root'));
