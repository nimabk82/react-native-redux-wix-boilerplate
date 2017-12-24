import {Navigation} from 'react-native-navigation';
import Test from './modules/components/Test';


export function registerScreens(store, Provider) {
    Navigation.registerComponent('example.Test', () => Test, store, Provider);
}