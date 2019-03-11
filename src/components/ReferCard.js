import React from 'react'
import {
  View,
  Text,
  StyleSheet, ScrollView, TouchableHighlight, Image,
} from 'react-native';
import PropTypes from "prop-types";
import CommonUtils from "../CommonUtils";
import {Button, Icon} from "react-native-elements";
// import * as Navigation from "react-native-navigation";

export default class ReferCard extends React.Component {

  static propTypes = {
    // componentId: PropTypes.string.isRequired,
    clientId : PropTypes.number.isRequired,
    clientName : PropTypes.string.isRequired,
    clientDescription : PropTypes.string,
    clientImage : PropTypes.string.isRequired,
    clientLogo : PropTypes.string.isRequired,
    onReferClick: PropTypes.func
  };

  constructor(props, context) {
    super(props, context);
    // this.believerRequestController = new BelieverRequestController();
    // this.onRewardClick = this.onRewardClick.bind(this);
    // Navigation.events().bindComponent(this);

  }

  componentDidAppear() {
    console.log('Rewards');
    console.log(this.props.componentId);
    CommonUtils.setCurrentActiveTab(this.props.componentId);

  }

  renderImage() {

    return <View style={{flex:2, height: 125, width:'100%'}}>
      <TouchableHighlight /*onPress={this.onMissionClick}*/ activeOpacity={0} style={{width:'100%', height: '100%'}}>
        <Image source={{uri: this.props.clientImage}}
               style={{width:'100%', height: '100%'}} />
      </TouchableHighlight>
    </View>
  }


  renderDescription() {
    return (
      <View style={{flex: 2, width: '100%'}}>
        <View style={{flex: 1, flexDirection: 'row', padding: 15}}>
          <Text style={{ flex: 4 , lineHeight: 20, fontWeight: 'bold' }}>{this.props.clientName}</Text>
        </View>
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <Text >{this.props.clientDescription}</Text>
        </View>
      </View>);
  }

  renderActions() {
    return <View style={{flex:1, flexDirection: 'row', marginTop:20}}>
      <View style={{flex:1, justifyContent:'center'}}>
        <Text style={{fontSize:12, color:'#a4a4a4', paddingLeft:10}}>
          {this.props.rewardPoints} Points
        </Text>
      </View>
      <View style={{flex:0.8}}>
        <Button
          backgroundColor={'#35AFC8'}
          title={'Redeem'}
          onPress={this.props.onRedeemClick}
          textStyle={{
            fontSize: 14,
            fontWeight: 'bold',
            textAlign: 'center',
            fontFamily:'Helvetica'
          }}
        />
      </View>

    </View>
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderImage()}
        {this.renderDescription()}
        {/*{this.renderActions()}*/}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 25
  }
})