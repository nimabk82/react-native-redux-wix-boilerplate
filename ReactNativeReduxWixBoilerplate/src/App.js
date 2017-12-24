import React from 'react';
import {Platform} from 'react-native';
import {Provider} from "react-redux";
import {Navigation} from "react-native-navigation";
import * as appActions from "./actions/index";
import {registerScreens} from "./screens";
import store from './actions/configureStore';
import {iconsMap, iconsLoaded} from './utils/AppIcons';

//adb reverse tcp:8081 tcp:8081 4.10.1  ./gradlew assembleRelease       chmod +x gradlew     adb shell input keyevent 82
registerScreens(store, Provider);

export default class App {
    constructor() {
        store.subscribe(this.onStoreUpdate.bind(this));
        store.dispatch(appActions.appInitialized());
    }

    onStoreUpdate() {
        const {root} = store.getState().app;
        // handle a root change
        // if your app doesn't change roots in runtime, you can remove onStoreUpdate() altogether
        if (this.currentRoot !== root) {
            this.currentRoot = root;

            Platform.OS === 'ios' ? iconsLoaded.then(() => {
                    this.startApp(root);
                }) :
                this.startApp(root);
        }
    }

    startApp(root) {
        switch (root) {
            case 'login':
                Platform.OS === 'android' ?
                    Navigation.startSingleScreenApp({
                        screen: {
                            screen: 'example.Test',
                            navigatorStyle: {
                                navBarHidden: false,
                                navBarTranslucent: false,
                                drawUnderNavBar: false,
                                navBarTransparent: false,
                                navBarButtonColor: 'black',
                            },
                            passProps: {
                                dispatch: store.dispatch,
                            },
                        },
                        appStyle: {
                            orientation: 'portrait',
                        },
                        passProps: {},
                        animationType: 'fade',
                        overrideBackPress: false,
                        backButtonHidden: false,
                    }) :
                    Navigation.startSingleScreenApp({
                        screen: {
                            screen: 'example.Test',
                            navigatorStyle: {
                                statusBarHideWithNavBar: false,
                                statusBarTextColorScheme: 'light',
                                navBarHidden: true,
                                statusBarHidden: false,
                                navBarBackgroundColor: 'black',
                            },
                            navigatorButtons: {
                                leftButtons: [{
                                    icon: iconsMap['ios-arrow-back'],
                                }
                                ]
                            },
                        },
                        appStyle: {
                            orientation: 'portrait',
                        },
                        passProps: {},
                        animationType: 'slide-down',
                    });
                return;
            default:
                console.error('Unknown app root');
        }
    }
}