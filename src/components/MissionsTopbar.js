import React, {Component} from "react";
import {View, Image} from 'react-native';

export default class MissionsTopbar extends Component {
  state = { orientation: 'P' };

  render() {
    return <View style={styles.container}>
      <Image style={styles.icon} source={require('../../assets/splash.png')} />
    </View>
  }
}


const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf: 'stretch',
  },
  icon: {
    height:20,
    // width:'20%'
  }
};