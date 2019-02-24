import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native'
import {Navigation} from 'react-native-navigation';

export default class Post extends React.Component {
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Post'
        },
      }
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Post</Text>

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