import * as types from '../actions/types';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    root: undefined // 'login' / 'after-login'
});

const INITIAL_STATE = {
    root: undefined
};

export default function app(state = initialState, action = {}) {
    switch (action.type) {
        case types.ROOT_CHANGED:
            return state.merge({
                root: action.root
            });
        default:
            return state;
    }
}