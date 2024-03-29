/* eslint-disable global-require */
/* eslint-disable no-undef */
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from "../reducers/index";

const store = createStore(
    reducers,
    {},
    compose (
        applyMiddleware(thunk),
    )
);

export default store;
