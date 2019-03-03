import React, {Component} from 'react';
import { Alert, Button, View, StyleSheet, Image } from 'react-native';
import {Badge, Text} from "react-native-elements";
import BelieverRequestController from "../controllers/BelieverRequestController";
import HttpRequestController from "../controllers/HttpRequestController";
import {Navigation} from "react-native-navigation";
import PropTypes from 'prop-types';
import { Avatar } from 'react-native-elements';

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

  };

  constructor(props, context) {
    super(props, context);
    Navigation.events().bindComponent(this);

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
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <Text>...</Text>
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

        <Text style={{ flex: 4 , fontFamily:'Helvetica', fontWeight: 'bold', verticalAlign:'center' }}>{this.props.missionTitle}</Text>

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
      return <Button
      // onPress={onPressLearnMore}
      title="Learn More"
      color="#841584"
      accessibilityLabel="Learn more about this purple button"
        />
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
  }
});

export default MissionDetail;