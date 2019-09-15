import React, {Component} from 'react';
import { View, StyleSheet, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import {Badge, Text} from "react-native-elements";
import BelieverRequestController from "../controllers/BelieverRequestController";
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
    isFavourite : PropTypes.number,
    onMissionClick : PropTypes.func,
    onBrandClick : PropTypes.func,

  };

  constructor(props, context) {
    super(props, context);
    this.onMissionClick = this.onMissionClick.bind(this);
    this.onBrandClick = this.onBrandClick.bind(this);
    this.favourite = this.favourite.bind(this);
    this.unfavourite = this.unfavourite.bind(this);
    this.state = {
      isFavourite : this.props.isFavourite
    }
    this.believerRequestController = new BelieverRequestController();

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

  async favourite() {
    let response = await this.believerRequestController.saveFavouriteMission(this.props.missionId);
    if(response) {
      this.setState({isFavourite: 1});
    }
  }

  async unfavourite() {
    let response = await this.believerRequestController.deleteFavouriteMission(this.props.missionId);
    if(response) {
      this.setState({isFavourite : 0});
    }
  }

  renderHeader() {
    return <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingLeft: 10}}>
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
      <View style={{flex : 3, height: '100%', backgroundColor: 'rgba(61,185,214,0.11)', justifyContent: 'center'}}>
        <Text style={{textAlign: 'center', fontSize: 11}}>
          {this.props.missionPoints + ' Points'}
        </Text>
      </View>

    </View>
  }

  renderFavourite() {
    if(this.state.isFavourite === 1) {
      return <View style={{flex: 1, alignItems: 'flex-end'}}>
        <TouchableOpacity onPress={this.unfavourite}>
        <Image source={require('../../assets/bookmark_filled.png')} />
        </TouchableOpacity>
      </View>
    }
    else{
      return <View style={{flex: 1, alignItems: 'flex-end'}}>
        <TouchableOpacity onPress={this.favourite} activeOpacity={0} >
        <Image source={require('../../assets/bookmark.png')} />
        </TouchableOpacity>
      </View>
    }
  }

  renderImage() {

    return <View style={{flex:2.5, backgroundColor: '#f2f2f2', /*borderColor: 'blue', borderWidth: 1,*/ width:'100%', height: 185}}>
      <TouchableHighlight onPress={this.onMissionClick} activeOpacity={0} style={{width:'100%', height: '100%'}}>
        <Image source={{uri: this.props.missionImage}}
             style={{width:'100%', height: '100%'}} />
      </TouchableHighlight>
    </View>
  }


  renderDescription() {
    return (
      <View style={{flex: 1, paddingHorizontal: 10, backgroundColor: '#f2f2f2', width: '100%'}}>
          <View style={{flex: 1, paddingTop:20, flexDirection: 'row', backgroundColor: '#f2f2f2', }}>
            <Text style={{ flex: 5 ,fontWeight: 'bold', fontSize: 14 }}>{this.props.missionTitle}</Text>
          </View>

          <Text style={{ flex: 3, flexGrow:1, fontSize:14 }}>{this.props.missionDescription}</Text>
        {this.renderFavourite()}

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
    minHeight: 400,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    elevation: 4,
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