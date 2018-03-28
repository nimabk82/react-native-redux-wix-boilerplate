import  {combineReducers} from 'redux';
import app from './rootReducer';
import auth from './authReducer';

export default combineReducers ({
    app,
    auth
});