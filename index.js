import {Navigation} from 'react-native-navigation';
import {registerScreens} from './src/screens';

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    topBar: {
      visible: true,
      leftButtons: [
        {
          id: 'sideMenuHamburger',
          icon: require('./assets/menu-button.png'),
          color: 'white',
        }
      ],
      background: {
        color: '#231f20',
        blur: false
      },
      title: {
        color: 'white',
        fontFamily: 'Helvetica',
      },
    },
  });
  Navigation.setRoot({
    root: {
      component: {
        name: 'Initializing'
      }
    },
  });
});