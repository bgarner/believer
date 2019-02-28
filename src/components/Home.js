import React, {Component} from 'react';
import {StyleSheet, ScrollView, Button} from 'react-native';
import { AsyncStorage } from 'react-native';
import {Navigation} from 'react-native-navigation';
import PropTypes from 'prop-types';
import BelieverRequestController from "../controllers/BelieverRequestController";
import HttpRequestController from "../controllers/HttpRequestController";
import Mission from "./Mission";
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
    this.believerRequestController = new BelieverRequestController();
    this.onMissionClick = this.onMissionClick.bind(this);
    Navigation.events().bindComponent(this);
    this.state = {
      missions : []
    }
  }

  componentDidAppear() {
    console.log('home');
    console.log(this.props.componentId);
    CommonUtils.setCurrentActiveTab(this.props.componentId);

  }

  async componentDidMount() {
    try {
      let missions = await this.believerRequestController.getMissionsFeed();
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
      missionImage={'https://facebook.github.io/react/logo-og.png'}
      clientLogo={'https://facebook.github.io/react/logo-og.png'}
      clientName={'Dummy Client'}
      onMissionClick={() => this.onMissionClick(item)}
      onBrandClick={() => this.onMissionClick(item)}

    />
  }

  renderMissionList() {
    let missionList = [];
    this.state.missions.forEach((item) => {
      missionList.push(this.renderMission(item));
    });
    return missionList;
  }

  onMissionClick(item) {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'MissionDetail',
        passProps: {
          missionId: item.id,
          missionTitle: item.name,
          missionDescription: item.content,
          missionType: item.challenge_type,
          missionPoints: item.points,
          missionImage: 'https://facebook.github.io/react/logo-og.png',
          clientLogo: 'https://facebook.github.io/react/logo-og.png',
          clientName: 'Dummy Client',
        },
        options: {
          topBar: {
            visible: true,
            title: {
              text: item.name
            }
          }
        }

      }
    });
  }

  render() {
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

});

export default Home;