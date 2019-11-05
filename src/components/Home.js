import React, {Component} from 'react';
import {StyleSheet, ScrollView, Button, View, Text, SafeAreaView} from 'react-native';
import {ButtonGroup} from 'react-native-elements';
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
    this.onClickTopBarButton = this.onClickTopBarButton.bind(this);
    Navigation.events().bindComponent(this);

    this.state = {
      missions : [],
      selectedIndex: 0,
      hideFavourite: false,
    }
  }

  async componentDidAppear() {
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
      isFavourite={item.is_fav}
      onMissionClick={() => this.onMissionClick(item)}
      onBrandClick={() => this.onClientClick(item)}
      hideFavourite={this.state.hideFavourite}
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

  async onClickTopBarButton(selectedIndex) {
    this.setState({selectedIndex});
    if(selectedIndex === 2) {
      let missions = await this.believerRequestController.getMissionHistory();
      this.setState({missions, hideFavourite: true});
    } else if(selectedIndex === 1) {
      let missions = await this.believerRequestController.getFavouriteMission();
      this.setState({missions, hideFavourite: false});
    }else{
      let missions = await this.believerRequestController.getMissionsFeed();
      this.setState({missions, hideFavourite: false});
    }
  }

  renderTopBar() {
    const buttons = ['Missions', 'Saved', 'Completed'];
    const { selectedIndex } = this.state;

    return (
      <View style={{height: 100, top: 30, marginTop: 50, padding: 0}}>
        <ButtonGroup
          onPress={this.onClickTopBarButton}
          selectedIndex={selectedIndex}
          buttons={buttons}
          buttonStyle={{margin: 0, borderBottomWidth: 3, borderBottomColor: '#e9e9e9', backgroundColor: 'white', borderColor: 'white'}}
          containerStyle={{height: 60, borderWidth: 0, padding: 0, margin: 0, backgroundColor: 'white'}}
          selectedButtonStyle={{borderBottomColor: '#35AFC8', borderBottomWidth: 5}}
          selectedTextStyle={{color: '#35AFC8'}}
          textStyle={{fontSize: 12, color: 'black', textAlign: 'auto'}}
        />
      </View>
    );
  }

  render() {
    if(!this.state.missions) {
      return null;
    }
    return (
      <View style={{flex: 1}}>
        {this.renderTopBar()}
        {/*<View>*/}
          <ScrollView style={styles.container}>
            { this.renderMissionList() }
          </ScrollView>
        {/*</View>*/}
      </View>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ecf0f1',
  },
  message: {
    padding: 10,
  }

});

export default Home;