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
    return await AsyncStorage.setItem('activeTab', JSON.stringify(value));
  }

  static async setLoginToken(token) {
    return await AsyncStorage.setItem('loginToken', JSON.stringify(token));
  }

  static async clearLoginToken() {
    return await AsyncStorage.setItem('loginToken', '');
  }

  static async getLoginToken() {
    const value = await AsyncStorage.getItem('loginToken');
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return null;
    }
  }
}