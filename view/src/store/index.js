import { createStore, combineReducers, applyMiddleware } from 'redux';
import { appReducer } from './reducers';
import thunk from 'redux-thunk';

const reducer = combineReducers({
    application: appReducer
})

const store = (window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStore)(reducer, applyMiddleware(thunk));

export default store;