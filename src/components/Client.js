import React, {Component} from 'react';
import {View, StyleSheet, Image, ImageBackground, TouchableHighlight} from 'react-native';
import {Text, Button} from "react-native-elements";
import PropTypes from 'prop-types';
import { Avatar } from 'react-native-elements';
import BelieverRequestController from "../controllers/BelieverRequestController";
import FollowButton from "./FollowButton";

class Client extends Component {

  static propTypes = {
    // componentId: PropTypes.string.isRequired,
    clientId : PropTypes.number.isRequired,
    clientName : PropTypes.string.isRequired,
    clientDescription : PropTypes.string,
    clientImage : PropTypes.string.isRequired,
    clientLogo : PropTypes.string.isRequired,
    onClientClick : PropTypes.func.isRequired,

  };

  constructor(props, context) {
    super(props, context);
    this.believerRequestController = new BelieverRequestController();
    this.onClientClick = this.onClientClick.bind(this);

  }

  onClientClick() {
    if (this.props.onClientClick) {
      this.props.onClientClick();
    }
  }

  render() {
    return <View style={{ width: '50%', height: '40%', padding: 5, borderWidth: 1, borderColor: '#eee', justifyContent: 'center', alignContent: 'center' }}>
      <View style={{ width: '100%', height: '60%' }}>
        <ImageBackground source={{uri: this.props.clientImage}} style={{ flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: '100%', }}>
            <TouchableHighlight activeOpacity={0} style={{ height:100 }} onPress={this.onClientClick}>
              <Avatar
                height={90}
                rounded
                title="CR"
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}
                source={{
                  uri: this.props.clientLogo,
                }}
                containerStyle={{  }}
              />
            </TouchableHighlight>
        </ImageBackground>
      </View>

        <TouchableHighlight activeOpacity={0} onPress={this.onClientClick} style={{ }}>
            <Text style={{fontWeight: 'bold', fontSize: 12, fontFamily:'Helvetica',  color: '#333', textAlign: 'center', paddingTop: 10}}>{this.props.clientName}</Text>
        </TouchableHighlight>


      <View style={{flex: 1, flexDirection: 'column',  height: 80, marginTop: 25, }}>
        <FollowButton unFollowEnable={false} initialState={"Follow"} clientId={this.props.clientId}/>
      </View>

    </View>
  }
}

export default Client;