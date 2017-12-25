import {StyleSheet, Text, View,Button} from "react-native";
import React, {Component} from "react";
import LinearGradient from 'react-native-linear-gradient';
import { handleFbLogin,facebookLogin } from '../../firebase/auth';

export default class Test extends Component<{}> {

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
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
                    <Text style={styles.buttonText}>
                        Gradient
                    </Text>
                </LinearGradient>
                <Button
                    onPress={facebookLogin}
                    title="Sign in with facebook"
                    color="#3c50e8"
                />
                <Text style={styles.instructions}>

                </Text>
            </View>
        );
    }
}

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