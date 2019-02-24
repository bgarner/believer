import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native'
import {Navigation} from 'react-native-navigation';

export default class Explore extends React.Component {
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Settings'
        },
      }
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Explore</Text>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})