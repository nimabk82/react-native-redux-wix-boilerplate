import { fbLoginPermissions } from '../constants/index';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { FBLoginManager } from 'react-native-facebook-login';
import firebase from 'react-native-firebase'import Auth from '../config/auth';

export const handleFbLogin = () => (
    Auth.Facebook.login(fbLoginPermissions)
        .then((token) => {
            console.log(token,'token');
            firebase.auth()
                .signInWithCredential(firebase.auth.FacebookAuthProvider.credential(token))
        })
        .catch((err) => this.onError && this.onError(err) &&             console.log(token,'token error'))

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
                console.info(JSON.stringify(currentUser.toJSON()))
            }
        })
        .catch((error) => {
            console.log(`Login fail with error: ${error}`)
        })
);

export  const facebookLogin = () => {
    return FBLoginManager
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
                console.info(JSON.stringify(currentUser.toJSON()))
            }
        })
        .catch((error) => {
            console.log(`Login fail with error: ${error}`)
        })
}