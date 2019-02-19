import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native'
import {Navigation} from 'react-native-navigation';

export default class SideMenu extends React.Component {
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Side Menu'
        },
      }
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Side Menu</Text>
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