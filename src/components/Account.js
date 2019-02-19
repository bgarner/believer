import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native'
import {Navigation} from 'react-native-navigation';

export default class Account extends React.Component {
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Account'
        },
      }
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Account</Text>
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