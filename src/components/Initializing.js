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
        <Image source={require('../../assets/splash.png')} style={{height: '100%', width: '100%'}}/>
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