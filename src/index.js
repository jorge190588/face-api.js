import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FacePage from './FacePage';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux';
import allReducers from './store/reducers';
import { Provider } from 'react-redux';

let store =  createStore(allReducers,
        window._REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
        <FacePage />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
