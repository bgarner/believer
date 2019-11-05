import React, {Component} from 'react';
import {Alert, View, StyleSheet, Image, Share, TouchableHighlight} from 'react-native';
import {Avatar, Button, Badge, Text} from "react-native-elements";
import {Navigation} from "react-native-navigation";
import PropTypes from 'prop-types';
import {LoginButton, ShareDialog} from 'react-native-fbsdk';

import BelieverRequestController from "../controllers/BelieverRequestController";
import {default as DeviceInfo} from 'react-native-device-info';
import {
  shareOnTwitter,
} from 'react-native-social-share';
import Mission from "./Mission";

class MissionDetail extends Component {
  static propTypes = {
    componentId: PropTypes.string.isRequired,
    missionId: PropTypes.number.isRequired,
    missionTitle: PropTypes.string.isRequired,
    missionDescription: PropTypes.string.isRequired,
    missionImage: PropTypes.string.isRequired,
    missionType: PropTypes.number.isRequired,
    missionPoints: PropTypes.number.isRequired,
    clientLogo: PropTypes.string.isRequired,
    clientName: PropTypes.string.isRequired,
    missionUrl: PropTypes.string

  };

  static get options() {
    return {
      topBar: {
        backButton: {
          color: "white",
          fontFamily: "Nunito",
          fontSize: 12,
          title: ""
        },
        title: {
          color: 'white',
        },
      },
    };
  }

  constructor(props, context) {
    super(props, context);
    Navigation.events().bindComponent(this);
    // this.shareToSocialMedia = this.shareToSocialMedia.bind(this);
    this.shareLinkWithShareDialog = this.shareLinkWithShareDialog.bind(this);
    const shareLinkContent = {
      contentType: 'link',
      contentUrl: this.props.missionUrl,
      contentDescription: 'Checkout this app!',
    };
    this.state = {shareLinkContent: shareLinkContent};
    this.believerRequestController = new BelieverRequestController();
    this.tweet = this.tweet.bind(this);

  }

  async shareLinkWithShareDialog() {
    const tmp = this;
    try {
      const canShowDialog = await ShareDialog.canShow(this.state.shareLinkContent);
      if (canShowDialog) {
        const result = await ShareDialog.show(tmp.state.shareLinkContent);
        if (!DeviceInfo.isEmulator()) {
          if (result.isCancelled) {
            Alert.alert('Not ready yet?', 'This share was cancelled');
          } else {
            try {
              await this.believerRequestController.postMissionCompletion(this.props.missionId);
              Alert.alert('Nice work!', `You earned ${this.props.missionPoints} points`);
            } catch (e) {
              Alert.alert('Oops!', 'Something went wrong while saving your progress.');
            }

          }
        } else {
          try {
            await this.believerRequestController.postMissionCompletion(this.props.missionId);
            Alert.alert('Nice work!', `You earned ${this.props.missionPoints} points`);
          } catch (e) {
            Alert.alert('Oops!', 'Something went wrong while saving your progress.');
          }
        }
      }
    } catch (e) {
      Alert.alert('Error!', 'Share fail with error: ' + e);
    }

  }

  tweet() {

    shareOnTwitter({
        // 'text':'Global democratized marketplace for art',
        'link': this.props.missionUrl,
      },
      (results) => {
        console.log(results);
      }
    );
  }

  renderMissionLaunchButton() {
    if (this.props.missionType) {
      return (
        <View style={styles.container}>
          <Button
            backgroundColor={'#3b5998'}
            title={'Share on Facebook'}
            onPress={this.shareLinkWithShareDialog}
            textStyle={{
              fontSize: 14,
              fontWeight: 'bold',
              textAlign: 'center',
              fontFamily: 'Helvetica'
            }}
          />
        </View>
      );

    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 7}}>
          <Mission
            missionId={this.props.missionId}
            missionTitle={this.props.missionTitle}
            missionDescription={this.props.missionDescription}
            missionImage={this.props.missionImage}
            missionType={this.props.missionType}
            missionPoints={this.props.missionPoints}
            clientLogo={this.props.clientLogo}
            clientName={this.props.clientName}
            hideFavourite
            />
        </View>
          {this.renderMissionLaunchButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: '#fff',
    // // borderColor: 'black', borderWidth: 1,
    // fontFamily: 'Helvetica',
    // height: 500
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  shareText: {
    fontSize: 20,
    margin: 10,
    color: '#fff',
  },
  fbButton: {
    backgroundColor: "#3b5998"
  },
  fbButtonContainer: {
    height: 70,
    borderColor: '#000',
    borderWidth: 1,
  }

});

export default MissionDetail;