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
    console.log(this.props.missionUrl);
    const shareLinkContent = {
      contentType: 'link',
      contentUrl: this.props.missionUrl,
      contentDescription: 'Checkout this app!',
    };
    this.state = {shareLinkContent: shareLinkContent};
    this.believerRequestController = new BelieverRequestController();
  }

  // shareToSocialMedia() {
  //   Share.share({
  //     message: 'BAM: we\'re helping your business with awesome React Native apps',
  //     url: 'http://bam.tech',
  //     title: 'Wow, did you see that?'
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
            alert('Share cancelled');
          }
          else {
            try{
              // let response = await this.believerRequestController.postMissionCompletion(this.props.missionId);
              alert(`You earned ${this.props.missionPoints} points`);
            }
            catch(e) {
              alert('Oops! Something went wrong while saving your progress.');
            }

          }
        }
        else {
          try{
            // let response = await this.believerRequestController.postMissionCompletion(this.props.missionId);
            alert(`You earned ${this.props.missionPoints} points`);
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


  //   ShareDialog.canShow(this.state.shareLinkContent).then(
  //     function(canShow) {
  //       if (canShow) {
  //         return ShareDialog.show(tmp.state.shareLinkContent);
  //       }
  //     }
  //   ).then(
  //     function(result) {
  //       console.log(result);
  //       if (result.isCancelled) {
  //         alert('Share cancelled');
  //       } else {
  //         // alert('Share success with postId: ' + result.postId);
  //         try{
  //           let response = await this.believerRequestController.postMissionCompletion(this.props.missionId);
  //           alert(`You earned ${response.points} points`);
  //         }
  //         catch(e) {
  //           alert('Oops! Something went wrong while saving your progress.');
  //         }
  //
  //       }
  //     },
  //     function(error) {
  //       alert('Share fail with error: ' + error);
  //     }
  //   );
  }



  renderHeader() {
    return <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', /*borderColor: 'blue', borderWidth: 1,*/ padding: 10}}>
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

    return <View style={{flex:4, backgroundColor: '#f2f2f2', /*borderColor: 'blue', borderWidth: 1,*/ width:'100%', height: 50}}>
      <Image source={{uri: this.props.missionImage}}
             style={{width:'100%', height: '100%'}} />
    </View>
  }
  renderDescription() {
    return <View style={{flex: 2, /*padding: 15,*/ backgroundColor: '#f2f2f2', width: '100%'/* borderColor: 'red', borderWidth: 1*/}}>

      <View style={{flex: 0.75, flexDirection: 'row', padding: 15, backgroundColor: '#f2f2f2', /*borderColor: 'red', borderWidth: 1,*/ alignItems: 'center'}}>

        <Text style={{ flex: 4 , fontFamily:'Helvetica', fontWeight: 'bold'}}>{this.props.missionTitle}</Text>

        <Badge style={{flex: 1,borderRadius: 9,
          height: 18,
          minWidth: 0,
          width: 18, backgroundColor: '#35AFC8'}} value={this.props.missionPoints}/>
      </View>

      <Text style={{ flex: 1, padding:10}}>{this.props.missionDescription}</Text>
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
          <TouchableHighlight onPress={this.shareLinkWithShareDialog.bind(this)}>
            <Text style={styles.shareText}> Share on Facebook </Text>
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
  },

});

export default MissionDetail;