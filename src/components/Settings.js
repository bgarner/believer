import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet, AsyncStorage,
} from 'react-native'
import {Navigation} from 'react-native-navigation';
import {USER_KEY} from "../config";
import {goToAuth} from "../navigation";
import CommonUtils from "../CommonUtils";

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


  constructor(props, context) {
    super(props, context);
    this.logout = this.logout.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Explore</Text>
        <Button
        onPress={this.logout}
        title="Sign Out"
        />
      </View>
    )
  }

  async logout() {
    try {
      await CommonUtils.clearLoginToken();
      goToAuth()
    } catch (err) {
      console.log('error signing out...: ', err)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})