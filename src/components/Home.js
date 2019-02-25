import React, {Component} from 'react';
import {StyleSheet, ScrollView, Button} from 'react-native';
import { AsyncStorage } from 'react-native';
import {Navigation} from 'react-native-navigation';
import PropTypes from 'prop-types';
import BelieverRequestController from "../controllers/BelieverRequestController";
import HttpRequestController from "../controllers/HttpRequestController";
import Challenge from "./Challenge";
import CommonUtils from "../CommonUtils";

class Home extends Component {
  static propTypes = {
    componentId: PropTypes.string.isRequired,
  };
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Home'
        },
      }
    };
  }

  constructor(props, context) {
    super(props, context);
    // this.believerRequestController = new BelieverRequestController();
    // this.httpRequestController = HttpRequestController.getInstance();
    this.onChallengeClick = this.onChallengeClick.bind(this);
    Navigation.events().bindComponent(this);

  }




  onChallengeClick() {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'Challenge',
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
      <ScrollView style={styles.container}>
        <Challenge id={1}></Challenge>
        <Challenge id={2}></Challenge>
        <Challenge id={3}></Challenge>
        <Challenge id={4}></Challenge>
      </ScrollView>
    );
  }

  componentDidAppear() {
    console.log('home');
    console.log(this.props.componentId);
    CommonUtils.setCurrentActiveTab(this.props.componentId);

  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  // input: {
  //   width: 200,
  //   height: 44,
  //   padding: 10,
  //   borderWidth: 1,
  //   borderColor: 'black',
  //   marginBottom: 10,
  // },
});

export default Home;