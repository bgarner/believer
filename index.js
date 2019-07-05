import {Navigation} from 'react-native-navigation';
import {registerScreens} from './src/screens';

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    topBar: {
      visible: true,
      // leftButtons: [
      //   {
      //     id: 'sideMenuHamburger',
      //     icon: require('./assets/menu-button.png'),
      //     color: 'white',
      //   }
      // ],
      background: {
        color: '#000',
        blur: false
      },
      title: {
        color: 'white',
        fontFamily: 'Helvetica',
      },
    },
    bottomTab: {
      selectedTextColor: '#35AFC8',
      selectedIconColor: '#35AFC8',
      fontFamily: 'Helvetica',
      fontSize: 10
    },
    sideMenu: {
      popGesture: false,
      openGestureMode: 'bezel',
      animationType: 'parallax'
    }
  });
  Navigation.setRoot({
    root: {
      component: {
        name: 'Initializing'
      }
    },
  });
});