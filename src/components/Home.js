import React, {Component} from 'react';
import {StyleSheet, ScrollView, Button} from 'react-native';
import { AsyncStorage } from 'react-native';
import {Navigation} from 'react-native-navigation';
import PropTypes from 'prop-types';
import BelieverRequestController from "../controllers/BelieverRequestController";
import HttpRequestController from "../controllers/HttpRequestController";
import Challenge from "./Challenge";
import { goToAuth } from '../navigation';
import { USER_KEY } from '../config';
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


  logout = async () => {
    try {
      await AsyncStorage.removeItem(USER_KEY)
      goToAuth()
    } catch (err) {
      console.log('error signing out...: ', err)
    }
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

        {/*<Button*/}
          {/*onPress={() => {*/}
            {/*Navigation.push(this.props.componentId, {*/}
              {/*component: {*/}
                {/*name: 'Challenge',*/}
              {/*}*/}
            {/*});*/}
          {/*}}*/}
          {/*title="View next screen"*/}
        {/*/>*/}

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
    // alignItems: 'center',
    // justifyContent: 'center',
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