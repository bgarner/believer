import React from 'react'
import {
  View,
  Text,
  StyleSheet, ScrollView, TouchableHighlight, Image,
} from 'react-native';
import PropTypes from "prop-types";
import CommonUtils from "../CommonUtils";
import {Button, Icon} from "react-native-elements";

export default class RewardCard extends React.Component {

  static propTypes = {
    // componentId: PropTypes.string.isRequired,
    rewardTitle : PropTypes.string.isRequired,
    rewardDescription : PropTypes.string,
    rewardImage : PropTypes.string.isRequired,
    rewardType : PropTypes.string.isRequired,
    rewardPoints : PropTypes.number.isRequired,
    userPointBalance: PropTypes.number,
    onRedeemClick : PropTypes.func,
  };

  renderImage() {

    return <View style={{flex:2, height: 185, width:'100%'}}>
      <TouchableHighlight /*onPress={this.onMissionClick}*/ activeOpacity={0} style={{width:'100%', height: '100%'}}>
        <Image source={{uri: this.props.rewardImage}}
               style={{width:'100%', height: '100%'}} />
      </TouchableHighlight>
    </View>
  }


  renderDescription() {
    return (
      <View style={{flex: 2, width: '100%'}}>
        <View style={{flex: 1, flexDirection: 'row', padding: 15}}>
          <Text style={{ flex: 4 , lineHeight: 20, fontWeight: 'bold' }}>{this.props.rewardTitle}</Text>
          <View style={{flex : 1}}>
            <Icon>
              {this.props.rewardPoints}
            </Icon>
          </View>
        </View>
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
        <Text >{this.props.rewardDescription}</Text>
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
          onPress={this.props.onRewardClick}
          disabled={this.props.userPointBalance < this.props.rewardPoints}
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
        {this.renderActions()}
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