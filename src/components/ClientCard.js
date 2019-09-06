import React, {Component} from 'react';
import {View, Image, TouchableHighlight} from 'react-native';
import {Text, Button,} from "react-native-elements";
import PropTypes from 'prop-types';
import FollowButton from "./FollowButton";

class ClientCard extends Component {

  static propTypes = {
    // componentId: PropTypes.string.isRequired,
    clientId : PropTypes.number.isRequired,
    clientName : PropTypes.string.isRequired,
    clientDescription : PropTypes.string,
    clientImage : PropTypes.string.isRequired,
    clientLogo : PropTypes.string.isRequired,
    onClientCardClick: PropTypes.func

  };

  constructor(props, context) {
    super(props, context);
    this.onClientCardClick = this.onClientCardClick.bind(this);

  }

  onClientCardClick() {
    if (this.props.onClientCardClick) {
      this.props.onClientCardClick();
    }
  }

  render() {

    return <View style={{width:160, height:200, marginHorizontal:12, marginVertical:15,}}>
      <TouchableHighlight onPress={this.onClientCardClick} activeOpacity={0} style={{height:'25%', justifyContent:'flex-end'}}>
      <Text style={{paddingHorizontal:20, paddingVertical:10, fontWeight:'bold', fontSize:12,}} multiline={true}>{this.props.clientName}</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={this.onClientCardClick} activeOpacity={0} style={{marginHorizontal: 15, padding:10, height:'62.5%', borderWidth:1}}>
        <Image
          style={{width: '100%', height: '100%'}}
          source={{ uri:this.props.clientLogo }}
        />
      </TouchableHighlight>
      <FollowButton clientId={this.props.clientId} initialState={"Unfollow"} unFollowEnable={true}/>
    </View>


  }


}

export default ClientCard;