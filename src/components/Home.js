import React, {Component} from 'react';
import {StyleSheet, ScrollView, Button, View, Text} from 'react-native';
import {Navigation} from 'react-native-navigation';
import PropTypes from 'prop-types';
import BelieverRequestController from "../controllers/BelieverRequestController";
import Mission from "./Mission";
import CommonUtils from "../CommonUtils";
import {CLOUDINARY_BASE_URL} from "../config.js";
import MissionsTopbar from './MissionsTopbar.js';

class Home extends Component {
  static propTypes = {
    componentId: PropTypes.string.isRequired,
  };

  static get options() {
    return {
      topBar: {
        drawBehind: true,
        title: {
          component: {
            name: 'MissionsTopbar',
            alignment: 'center'
          }
        },
      },
    }
  }

  constructor(props, context) {
    super(props, context);
    this.believerRequestController = new BelieverRequestController();
    this.onMissionClick = this.onMissionClick.bind(this);
    this.onClientClick = this.onClientClick.bind(this);
    Navigation.events().bindComponent(this);

    this.state = {
      missions : []
    }
  }

  async componentDidAppear() {
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        drawBehind: true,
        title: {
          component: {
            name: 'MissionsTopbar',
            alignment: 'center'
          }
        },
      }
    });
    CommonUtils.setCurrentActiveTab(this.props.componentId);
    try {
      let missions = await this.believerRequestController.getMissionsFeed();
      this.setState({missions});
    }
    catch(e) {
      throw e;
    }
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
          missionImage: CLOUDINARY_BASE_URL + item.image,
          missionUrl: item.share_url,
          clientLogo: CLOUDINARY_BASE_URL + item.client_logo,
          clientName: item.brand_name,

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

  onClientClick(item) {

    Navigation.push(this.props.componentId, {
      component: {
        name: 'ClientDetail',
        passProps: {
          clientId: item.brand_id,
        },
        options: {
          topBar: {
            visible: true,
            title: {
              text: item.brand_name
            }
          }
        }

      }
    });
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
      onMissionClick={() => this.onMissionClick(item)}
      onBrandClick={() => this.onClientClick(item)}

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
          No Missions found. Let's find some brands to follow!
        </Text>
      </View>
    }

  }



  render() {
    if(!this.state.missions) {
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

export default Home;