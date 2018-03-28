import {StyleSheet, Text, View, Button, TouchableOpacity, Image} from "react-native";
import React, {Component} from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as authActions from '../../actions/auth';
import LinearGradient from 'react-native-linear-gradient';
// import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';


const FBSDK = require('react-native-fbsdk');
const {
    LoginButton,
    LoginManager,
    AccessToken
} = FBSDK;
class Test extends Component<{}> {

    state = {photo: '', name: '', email: ''};

    static navigatorButtons = {
        rightButtons: [
            {
                icon: require('../../utils/img/bank.png'),
                id: 'add'
            }
        ],
        leftButtons: [
            {
                title: 'Cancel', // for a textual button, provide the button title (label)
                id: 'cancel', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
                disabled: false, // optional, used to disable the button (appears faded and doesn't interact)
                disableIconTint: true, // optional, by default the image colors are overridden and tinted to navBarButtonColor, set to true to keep the original image colors
                showAsAction: 'ifRoom', // optional, Android only. Control how the button is displayed in the Toolbar. Accepted valued: 'ifRoom' (default) - Show this item as a button in an Action Bar if the system decides there is room for it. 'always' - Always show this item as a button in an Action Bar. 'withText' - When this item is in the action bar, always show it with a text label even if it also has an icon specified. 'never' - Never show this item as a button in an Action Bar.
                buttonColor: 'black', // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
                buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
                buttonFontWeight: '600', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
            }
        ]
    };

    facebookLogin = () => {
        return LoginManager
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
                    console.info(currentUser)
                }
            })
            .catch((error) => {
                console.log(`Login fail with error: ${error}`)
            })
    };

    render() {
        return (
            <View style={styles.container}>
                {this.state.photo != '' &&
                <Image source={{uri:this.state.photo}} style={{width:60,height:60,borderRadius:40}}/>}
                <LoginButton
                    publishPermissions={["publish_actions,email"]}
                    onLoginFinished={(error, result) => {
                                            console.log(result);
              if (error) {
               console.log(error);
              } else if (result.isCancelled) {
                console.log('canceled');
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data);
                    firebase.auth()
                    .signInWithCredential(firebase.auth.FacebookAuthProvider.credential(data.accessToken.toString()))
                    .then(result =>this.setState({photo:result._user.photoURL,name:result._user.displayName,email:result._user.email}))
                  }
                )
              }
            }
          }
                    onLogoutFinished={() => alert("logout.")}/>
                <TouchableOpacity>
                    <Text style={styles.instructions}>
                        {this.state.name} ---- {this.state.email}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.props.authActions.loginUser}>
                    <Text style={styles.instructions}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

function mapStateToProps(state, ownProps) {
    console.log(state);
    return {
        user : state.auth
    };
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    linearGradient: {
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});