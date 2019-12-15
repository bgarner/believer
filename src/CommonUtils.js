import AsyncStorage from '@react-native-community/async-storage';

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

  static async setUserId(userId) {
    return await AsyncStorage.setItem('userId', JSON.stringify(userId));
  }

  static async clearUserId() {
    return await AsyncStorage.setItem('userId', '');
  }

  static async getUserId() {
    const value = await AsyncStorage.getItem('userId');
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return null;
    }
  }


  static async setDrawerOpen(isOpen) {
    return await AsyncStorage.setItem('drawerOpen', JSON.stringify(isOpen));
  }

  static async isDrawerOpen() {
    const value = await AsyncStorage.getItem('drawerOpen');
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return false;
    }
  }
}
