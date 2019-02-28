import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native'
import {Navigation} from 'react-native-navigation';
import PropTypes from "prop-types";
import CommonUtils from "../CommonUtils";

export default class Rewards extends React.Component {

  static propTypes = {
    componentId: PropTypes.string.isRequired,
  };
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Rewards'
        },
      }
    };
  }

  constructor(props, context) {
    super(props, context);
    // this.believerRequestController = new BelieverRequestController();
    // this.httpRequestController = HttpRequestController.getInstance();
    // this.onMissionClick = this.onMissionClick.bind(this);
    Navigation.events().bindComponent(this);

  }


  render() {
    return (
      <View style={styles.container}>
        <Text>Rewards</Text>
      </View>
    )
  }

  componentDidAppear() {
    console.log('Rewards');
    console.log(this.props.componentId);
    CommonUtils.setCurrentActiveTab(this.props.componentId);

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})