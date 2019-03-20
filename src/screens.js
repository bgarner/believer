import {Navigation} from 'react-native-navigation';
import Login from "./components/Login";
import Home from "./components/Home";
import Mission from "./components/Mission";
import Rewards from "./components/Rewards";
import Initializing from "./components/Initializing";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Refer from "./components/Refer";
import Account from "./components/Account";
import SideMenu from "./components/SideMenu";
import Post from "./components/Post";
import Explore from "./components/Explore";
import Following from "./components/Following";
import Status from "./components/Status";
import Settings from "./components/Settings";
import MissionDetail from "./components/MissionDetail";
import Client from "./components/Client";
import ClientDetail from "./components/ClientDetail";
import ReferForm from "./components/ReferForm";
import MessageList from "./components/MessageList";

export function registerScreens() {
  // Navigation.registerComponent('Login', () => Login);

  Navigation.registerComponent('Initializing', () => Initializing);
  Navigation.registerComponent('SignUp', () => SignUp);
  Navigation.registerComponent('SignIn', () => SignIn);
  Navigation.registerComponent('Home', () => Home);
  Navigation.registerComponent('Rewards', () => Rewards);
  Navigation.registerComponent('Post', () => Post);
  Navigation.registerComponent('Refer', () => Refer);
  Navigation.registerComponent('ReferForm', () => ReferForm);
  Navigation.registerComponent('Account', () => Account);
  Navigation.registerComponent('Explore', () => Explore);
  Navigation.registerComponent('Following', () => Following);
  Navigation.registerComponent('Status', () => Status);
  Navigation.registerComponent('Settings', () => Settings);
  Navigation.registerComponent('Mission', () => Mission);
  Navigation.registerComponent('MissionDetail', () => MissionDetail);
  Navigation.registerComponent('Client', () => Client);
  Navigation.registerComponent('ClientDetail', () => ClientDetail);
  Navigation.registerComponent('SideMenu', () => SideMenu);
  Navigation.registerComponent('MessageList', () => MessageList);






}