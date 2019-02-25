// Initializing.js
import React from 'react'
import {
  View,
  Image,
  StyleSheet,
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
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/splash.png')} style={{height: 85, width: 300}}/>
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