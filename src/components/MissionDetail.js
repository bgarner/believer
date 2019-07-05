import React, {Component} from 'react';
import { Alert, Button, View, StyleSheet, Image, Share, TouchableHighlight} from 'react-native';
import {Avatar, Badge, Text} from "react-native-elements";
import {Navigation} from "react-native-navigation";
import PropTypes from 'prop-types';
import {LoginButton, ShareDialog} from 'react-native-fbsdk';
import BelieverRequestController from "../controllers/BelieverRequestController";
import {default as DeviceInfo} from 'react-native-device-info';

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

  constructor(props, context) {
    super(props, context);
    Navigation.events().bindComponent(this);
    this.shareToSocialMedia = this.shareToSocialMedia.bind(this);
    this.shareLinkWithShareDialog = this.shareLinkWithShareDialog.bind(this);
    const shareLinkContent = {
      contentType: 'link',
      contentUrl: this.props.missionUrl,
      contentDescription: 'Checkout this app!',
    };
    this.state = {shareLinkContent: shareLinkContent};
    this.believerRequestController = new BelieverRequestController();
  }

  shareToSocialMedia() {
    const self = this;
    Share.share({
      message: self.props.missionDescription,
      url: self.props.missionUrl,
      title: self.props.missionTitle,
    }, {
      // Android only:
      // dialogTitle: 'Share BAM goodness',
      // iOS only:
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter'
      ]
    })
  }


  async shareLinkWithShareDialog() {
    const tmp = this;
    try {
      const canShowDialog = await ShareDialog.canShow(this.state.shareLinkContent);
      if(canShowDialog) {
        const result = await ShareDialog.show(tmp.state.shareLinkContent);
        if(! DeviceInfo.isEmulator()){
          if (result.isCancelled) {
            alert('Not ready yet? This share was cancelled');
          }
          else {
            try{
              await this.believerRequestController.postMissionCompletion(this.props.missionId);
              alert(`Nice work! \nYou earned ${this.props.missionPoints} points`);
            }
            catch(e) {
              alert('Oops! Something went wrong while saving your progress.');
            }

          }
        }
        else {
          try{
            await this.believerRequestController.postMissionCompletion(this.props.missionId);
            alert(`Nice work! \n You earned ${this.props.missionPoints} points`);
          }
          catch(e) {
            alert('Oops! Something went wrong while saving your progress.');
          }
        }
      }
    }
    catch(e) {
      alert('Share fail with error: ' + e);
    }

  }



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
      // return <Button
      // onPress={this.shareToSocialMedia}
      // title="Complete Mission"
      // color="#35AFC8"
      //   />

      return (
        <View style={styles.container}>
          {/*<LoginButton*/}
            {/*readPermissions={["email"]}*/}
            {/*onLoginFinished={*/}
              {/*(error, result) => {*/}
                {/*if (error) {*/}
                  {/*alert("Login failed with error: " + error.message);*/}
                {/*} else if (result.isCancelled) {*/}
                  {/*alert("Login was cancelled");*/}
                {/*} else {*/}
                  {/*alert("Login was successful with permissions: " + result.grantedPermissions)*/}
                {/*}*/}
              {/*}*/}
            {/*}*/}
            {/*onLogoutFinished={() => alert("User logged out")}/>*/}
          <TouchableHighlight style={ styles.fbButton} onPress={this.shareLinkWithShareDialog}>
          {/*<TouchableHighlight onPress={this.shareToSocialMedia}>*/}
          <View style={styles.fbButtonContainer}>
          <Image source = {require('../../assets/fb.png')}></Image>
          <Text style={styles.shareText}> Share </Text>
          </View>
          </TouchableHighlight>
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