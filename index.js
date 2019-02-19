import {Navigation} from 'react-native-navigation';
import {registerScreens} from './src/screens';

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    topBar: {
      visible: false
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