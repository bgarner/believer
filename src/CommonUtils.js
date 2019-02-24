import {AsyncStorage} from 'react-native';

export default class CommonUtils {

  static async getCurrentActiveTab() {
    const value = await AsyncStorage.getItem('activeTab');
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return null;
    }
  }

  static async setCurrentActiveTab(value) {

    await AsyncStorage.setItem('activeTab', JSON.stringify(value));
  }
}