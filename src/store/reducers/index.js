import gameFacenet from './gameFacenet';
import {combineReducers}  from 'redux';

const allReducers = combineReducers({
    gameFacenet:gameFacenet,
});

export default allReducers;