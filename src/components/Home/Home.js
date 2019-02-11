import React, {Component} from 'react';
import { Alert, Button, TextInput, View, StyleSheet } from 'react-native';
import {Text} from "react-native-elements";
import PropTypes from 'prop-types';

import BelieverRequestController from "../../controllers/BelieverRequestController";
import HttpRequestController from "../../controllers/HttpRequestController";
import {Navigation} from 'react-native-navigation';

class Home extends Component {
  static propTypes = {
    componentId: PropTypes.string.isRequired,
  };
  constructor(props, context) {
    super(props, context);
    this.believerRequestController = new BelieverRequestController();
    this.httpRequestController = HttpRequestController.getInstance();
    this.onChallengeClick = this.onChallengeClick.bind(this);
    Navigation.events().bindComponent(this);

  }

  componentDidMount() {

    if (!this.httpRequestController.token) {
      Navigation.showModal({
        stack: {
          children: [{
            component: {
              name: 'Login',
              options: {
                topBar: {
                  title: {
                    text: 'Login'
                  }
                }
              }
            }
          }]
        }
      });
    }
  }

  onChallengeClick() {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'ChallengeDetail',
        passProps: {
          text: 'Pushed screen'
        },
        options: {
          topBar: {
            title: {
              text: 'Challenge Detail' //challenge detail title
            }
          }
        }
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello</Text>
        <Button
          onPress={this.onChallengeClick}
          title="Submit"
        />
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

export default Home;