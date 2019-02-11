import React, {Component} from 'react';
import { Alert, Button, TextInput, View, StyleSheet } from 'react-native';
import {Text} from "react-native-elements";
import BelieverRequestController from "../../controllers/BelieverRequestController";
import HttpRequestController from "../../controllers/HttpRequestController";
import {Navigation} from "react-native-navigation";
import PropTypes from 'prop-types';


class ChallengeDetail extends Component {
  static propTypes = {
    componentId: PropTypes.string.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    Navigation.events().bindComponent(this);

  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Details</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});

export default ChallengeDetail;