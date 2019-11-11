// Initializing.js
import React from 'react'
import {
  View,
  Image,
  StyleSheet,
  StatusBar
} from 'react-native'

import { goToAuth, goHome } from '../navigation'
import CommonUtils from "../CommonUtils";
import Spinner from 'react-native-loading-spinner-overlay';

export default class Initialising extends React.Component {
  async componentDidMount() {
    try {
      const token = await CommonUtils.getLoginToken();
      console.log('token: ', token)
      if (token) {
        setTimeout(goHome, 1000)
      } else {
        setTimeout(goToAuth, 1000);
      }
    } catch (err) {
      console.log('error: ', err)
      goToAuth()
    }
  }

  render() {
    StatusBar.setBarStyle('light-content', true);
    return (
      <View style={styles.container}>
        <Spinner
          visible={true}
          textStyle={{color:'#fff'}}
          textContent={'Loading'}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  }
})