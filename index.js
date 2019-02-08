import {Navigation} from 'react-native-navigation';
import {registerScreens} from './src/screens';

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    topBar: {
      noBorder: false,
    },
    bottomTabs: {
      backgroundColor: '#ababab',
      translucent: false,
      animate: true,
    },
    bottomTab: {
      fontSize: 20,
    }
  });
});

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'Login'
      }
    }
  });
});


