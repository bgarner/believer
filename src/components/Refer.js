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

export default class Refer extends React.Component {
  static propTypes = {
    componentId: PropTypes.string.isRequired,
  };
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Refer',
        },
        leftButtons: [
          {
            id: 'sideMenuHamburger',
            icon: require('../../assets/menu-button.png'),
            color: 'white',
          }
        ],
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
        <Text>Refer</Text>

      </View>
    )
  }

  componentDidAppear() {
    console.log('Refer');
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