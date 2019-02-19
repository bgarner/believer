import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native'
import {Navigation} from 'react-native-navigation';

export default class Refer extends React.Component {
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Refer'
        },
      }
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Refer</Text>

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