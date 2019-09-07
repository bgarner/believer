import React, {Component} from 'react';
import {StyleSheet, ScrollView, Button, View, Text} from 'react-native';
import {Navigation} from 'react-native-navigation';
import PropTypes from 'prop-types';
import BelieverRequestController from "../controllers/BelieverRequestController";
import Mission from "./Mission";
import CommonUtils from "../CommonUtils";
import {CLOUDINARY_BASE_URL} from "../config.js";

class MissionHistory extends Component {
  static propTypes = {
    componentId: PropTypes.string.isRequired,
  };

  static get options() {
    return {
      topBar: {
        backButton: {
          color: "white",
          fontFamily: "Nunito",
          fontSize: 12,
          title: "Back"
        },
        title: {
          text: 'Mission History',
          color: 'white',
        },
      },
    };
  }

  constructor(props, context) {
    super(props, context);
    this.believerRequestController = new BelieverRequestController();
    Navigation.events().bindComponent(this);

    this.state = {
      missions : []
    }
  }

  async componentDidAppear() {
    console.log('home');
    console.log(this.props.componentId);
    CommonUtils.setCurrentActiveTab(this.props.componentId);
    try {
      let missions = await this.believerRequestController.getMissionHistory();
      this.setState({missions});
    }
    catch(e) {
      throw e;
    }

  }

  renderMission(item) {
    return <Mission
      id={item.id}
      key={item.id}
      missionId={item.id}
      missionTitle={item.name}
      missionDescription={item.content}
      missionType={item.challenge_type}
      missionPoints={item.points}
      missionImage={CLOUDINARY_BASE_URL + item.image}
      clientLogo={CLOUDINARY_BASE_URL + item.client_logo}
      clientName={item.brand_name}
    />
  }

  renderMissionList() {
    let missionList = [];
    if(this.state.missions.length > 0) {
      this.state.missions.forEach((item) => {
        missionList.push(this.renderMission(item));
      });
      return missionList;
    }
    else{
      return <View style={styles.message}>
        <Text>
          No Missions history found. Let's find some missions to complete!
        </Text>
      </View>
    }

  }



  render() {
    if(!this.state.missions || this.state.missions.length < 1) {
      return null;
    }
    return (
      <ScrollView style={styles.container}>
        { this.renderMissionList() }
      </ScrollView>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  message: {
    padding: 10,
  }

});

export default MissionHistory;