import firebase from 'react-native-firebase';
const FBSDK = require('react-native-fbsdk');
const {
    LoginButton,
    LoginManager,
    AccessToken
} = FBSDK;
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER
} from './types';

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });


        LoginManager
            .logInWithReadPermissions(['public_profile', 'email'])
            .then((result) => {
                if (!result.isCancelled) {
                    console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`)
                    // get the access token
                    return AccessToken.getCurrentAccessToken()
                }
            })
            .then(data => {
                if (data) {
                    // create a new firebase credential with the token
                    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken)
                    // login with credential
                    return firebase.auth().signInWithCredential(credential)
                }
            })
            .then((currentUser) => {
                if (currentUser) {
                loginUserSuccess(dispatch, currentUser);
                }
            })
            .catch((error) => {
                loginUserFail(dispatch,error)
            });
        // firebase.auth().signInWithEmailAndPassword(email, password)
        //     .then(user => loginUserSuccess(dispatch, user))
        //     .catch((error) => {
        //         firebase.auth().createUserWithEmailAndPassword(email, password)
        //             .then(user => loginUserSuccess(dispatch, user))
        //             .catch(() => loginUserFail(dispatch));
        //     });
    };
};

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
    console.log(user);
    // Actions.main();

};

const loginUserFail = (dispatch,error) => {
    dispatch({
        type: LOGIN_USER_FAIL,
        error : error
    });
};