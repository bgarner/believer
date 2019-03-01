import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native'
import {Navigation} from 'react-native-navigation';
import BelieverRequestController from "../controllers/BelieverRequestController";

export default class Explore extends React.Component {
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Following'
        },
      }
    };
  }


  constructor(props, context) {
    super(props, context);
    this.believerRequestController = new BelieverRequestController();
    // this.onMissionClick = this.onMissionClick.bind(this);
    // Navigation.events().bindComponent(this);
    this.state = {
      clients : []
    }
  }

  async componentDidMount() {
    try {
      let clients = await this.believerRequestController.getClientsFollowedByUser();
      this.setState({clients: clients});
    }
    catch(e) {
      throw e;
    }

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