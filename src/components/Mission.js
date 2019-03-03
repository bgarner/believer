import React, {Component} from 'react';
import { View, StyleSheet, Image, TouchableHighlight } from 'react-native';
import {Text} from "react-native-elements";
// import BelieverRequestController from "../controllers/BelieverRequestController";
// import HttpRequestController from "../controllers/HttpRequestController";
// import {Navigation} from "react-native-navigation";
import PropTypes from 'prop-types';
import { Avatar, Icon } from 'react-native-elements';

class Mission extends Component {
  static propTypes = {
    missionId : PropTypes.number.isRequired,
    missionTitle : PropTypes.string.isRequired,
    missionDescription : PropTypes.string.isRequired,
    missionImage : PropTypes.string.isRequired,
    missionType : PropTypes.number.isRequired,
    missionPoints : PropTypes.number.isRequired,
    clientLogo : PropTypes.string.isRequired,
    clientName : PropTypes.string.isRequired,
    onMissionClick : PropTypes.func,
    onBrandClick : PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.onMissionClick = this.onMissionClick.bind(this);
    this.onBrandClick = this.onBrandClick.bind(this);

  }

  onMissionClick() {
    if (this.props.onMissionClick) {
      this.props.onMissionClick();
    }
  }

  onBrandClick() {
    if (this.props.onBrandClick) {
      this.props.onBrandClick();
    }
  }

  renderHeader() {
    return <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingRight:10}}>
      <View style={{flex: 2 }}>
        <TouchableHighlight activeOpacity={0} onPress={this.onBrandClick}>
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
        </TouchableHighlight>
      </View>
      <View style={{flex: 8, paddingLeft: 10}}>
          <TouchableHighlight activeOpacity={0} onPress={this.onBrandClick}>
            <Text style={{fontWeight: 'bold'}}>{this.props.clientName}</Text>
          </TouchableHighlight>
      </View>
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <Text>...</Text>
      </View>

    </View>
  }



  renderImage() {

    return <View style={{flex:2.5, backgroundColor: '#f2f2f2', /*borderColor: 'blue', borderWidth: 1,*/ width:'100%', height: 50}}>
      <TouchableHighlight onPress={this.onMissionClick} activeOpacity={0} style={{width:'100%', height: '100%'}}>
        <Image source={{uri: this.props.missionImage}}
             style={{width:'100%', height: '100%'}} />
      </TouchableHighlight>
    </View>
  }


  renderDescription() {
    return (
      <View style={{flex: 2, padding: 15, backgroundColor: '#f2f2f2', /* borderColor: 'red', borderWidth: 1,*/ width: '100%'}}>
          <View style={{flex: 1, flexDirection: 'row', padding: 15, backgroundColor: '#f2f2f2', /* borderColor: 'red', borderWidth: 1*/}}>
            <Text style={{ flex: 4 , lineHeight: 30, fontWeight: 'bold' }}>{this.props.missionTitle}</Text>
            <View style={{flex : 1}}>
              <Icon

              >
              {this.props.missionPoints}
              </Icon>
            </View>
          </View>

          <Text style={{ flex: 1, paddingTop: 10, paddingBottom: 10 }}>{this.props.missionDescription}</Text>
      </View>);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderImage()}
        {this.renderDescription()}
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
    height: 400
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

export default Mission;