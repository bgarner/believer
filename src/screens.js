import {Navigation} from 'react-native-navigation';
import Login from "./components/Login/Login";

export function registerScreens() {
  Navigation.registerComponent('Login', () => Login);
}