import {Navigation} from 'react-native-navigation';
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import ChallengeDetail from "./components/Challenge/ChallengeDetail";

export function registerScreens() {
  Navigation.registerComponent('Login', () => Login);
  Navigation.registerComponent('Home', () => Home);
  Navigation.registerComponent('ChallengeDetail', () => ChallengeDetail);


}