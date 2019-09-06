import React, {Component} from 'react';
import { Alert, View, StyleSheet, Image, Share, TouchableHighlight} from 'react-native';
import {Avatar,Button, Badge, Text} from "react-native-elements";
import {Navigation} from "react-native-navigation";
import PropTypes from 'prop-types';
import {LoginButton, ShareDialog} from 'react-native-fbsdk';

import BelieverRequestController from "../controllers/BelieverRequestController";
import {default as DeviceInfo} from 'react-native-device-info';
import {
  shareOnTwitter,
} from 'react-native-social-share';

class MissionDetail extends Component {
  static propTypes = {
    componentId: PropTypes.string.isRequired,
    missionId : PropTypes.number.isRequired,
    missionTitle : PropTypes.string.isRequired,
    missionDescription : PropTypes.string.isRequired,
    missionImage : PropTypes.string.isRequired,
    missionType : PropTypes.number.isRequired,
    missionPoints : PropTypes.number.isRequired,
    clientLogo : PropTypes.string.isRequired,
    clientName : PropTypes.string.isRequired,
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

  // shareToSocialMedia() {
  //   const self = this;
  //   Share.share({
  //     message: self.props.missionDescription,
  //     url: self.props.missionUrl,
  //     title: self.props.missionTitle,
  //   }, {
  //     // Android only:
  //     // dialogTitle: 'Share BAM goodness',
  //     // iOS only:
  //     excludedActivityTypes: [
  //       'com.apple.UIKit.activity.PostToTwitter'
  //     ]
  //   })
  // }


  async shareLinkWithShareDialog() {
    const tmp = this;
    try {
      const canShowDialog = await ShareDialog.canShow(this.state.shareLinkContent);
      if(canShowDialog) {
        const result = await ShareDialog.show(tmp.state.shareLinkContent);
        if(! DeviceInfo.isEmulator()){
          if (result.isCancelled) {
            Alert.alert('Not ready yet?','This share was cancelled');
          }
          else {
            try{
              await this.believerRequestController.postMissionCompletion(this.props.missionId);
              Alert.alert('Nice work!',`You earned ${this.props.missionPoints} points`);
            }
            catch(e) {
              Alert.alert('Oops!', 'Something went wrong while saving your progress.');
            }

          }
        }
        else {
          try{
            await this.believerRequestController.postMissionCompletion(this.props.missionId);
            Alert.alert('Nice work!', `You earned ${this.props.missionPoints} points`);
          }
          catch(e) {
            Alert.alert('Oops!', 'Something went wrong while saving your progress.');
          }
        }
      }
    }
    catch(e) {
      Alert.alert( 'Error!','Share fail with error: ' + e);
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

  // async tweet() {
  //   try {
  //     const result = await Share.share({
  //       message:
  //         'React Native | A framework for building native apps using React',
  //     });
  //
  //     if (result.action === Share.sharedAction) {
  //       if (result.activityType) {
  //         // shared with activity type of result.activityType
  //       } else {
  //         // shared
  //       }
  //     } else if (result.action === Share.dismissedAction) {
  //       // dismissed
  //     }
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  renderHeader() {
    return <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', padding: 10}}>
      <View style={{flex: 2 }}>
        <Avatar
          medium
          rounded
          title="CR"
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
          source={{
            uri: this.props.clientLogo,
          }}
        />
      </View>
      <View style={{flex: 8, paddingLeft: 10}}>
        <Text style={{fontWeight: 'bold'}}>{this.props.clientName}</Text>
      </View>


    </View>
  }

  renderImage() {

    return <View style={{flex:4, backgroundColor: '#f2f2f2', width:'100%', height: 100}}>
      <Image source={{uri: this.props.missionImage}}
             style={{width:'100%', height: '100%'}} />
    </View>
  }
  renderDescription() {
    return <View style={{flex: 2, backgroundColor: '#f2f2f2', width: '100%'}}>

      <View style={{flex: 0.75, flexDirection: 'row', padding: 15, backgroundColor: '#f2f2f2', alignItems: 'center'}}>

        <Text style={{ flex: 4 , fontFamily:'Helvetica', fontWeight: 'bold'}}>{this.props.missionTitle}</Text>

        <Badge
          value={this.props.missionPoints}
          containerStyle={{
            backgroundColor: '#35AFC8',
            width: 50,
            height: 25,
          }}
        />
      </View>

      <Text style={{ flex: 1, paddingHorizontal:15}}>{this.props.missionDescription}</Text>
    </View>
  }


  renderMissionLaunchButton() {
    if(this.props.missionType) {
      return (
        <View style={styles.container}>
          {/*<TouchableHighlight  onPress={this.shareLinkWithShareDialog}>*/}
          {/*<View style={styles.fbButtonContainer}>*/}
          {/*/!*<Image source = {require('../../assets/fb.png')}></Image>/!**!/*!/*/}
          {/*<Text style={styles.shareText}> Share </Text>*/}
          {/*</View>*/}
          {/*</TouchableHighlight>*/}

          <Button
            backgroundColor={'#3b5998'}
            title={'Share on Facebook'}
            onPress={this.shareLinkWithShareDialog}
            textStyle={{
              fontSize: 14,
              fontWeight: 'bold',
              textAlign: 'center',
              fontFamily:'Helvetica'
            }}
          />

          {/*<TouchableHighlight style={ styles.fbButton} onPress={this.tweet}>*/}
          {/*  <View style={styles.fbButtonContainer}>*/}
          {/*    <Image source = {require('../../assets/fb.png')}></Image>*/}
          {/*    <Text style={styles.shareText}> Share </Text>*/}
          {/*  </View>*/}
          {/*</TouchableHighlight>*/}
        </View>
      );

    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderImage()}
        {this.renderDescription()}
        {this.renderMissionLaunchButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    // borderColor: 'black', borderWidth: 1,
    fontFamily: 'Helvetica',
    height: 500
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