import React from 'react'
import {
  View,
  Text,
  StyleSheet, ScrollView, TouchableHighlight, Image, ImageBackground,
} from 'react-native';
import PropTypes from "prop-types";
import CommonUtils from "../CommonUtils";
import {Avatar, Button, Icon} from "react-native-elements";
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

  renderImage() {

    return <View style={{flex:3}}>
    <ImageBackground source={{uri: this.props.clientImage}} style={{ marginBottom: 10, height: '100%'}}>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center',  height: 70,}}>
        {/*</View>*/}
        <TouchableHighlight
          activeOpacity={0}
          onPress={this.onClientClick}
          style={{flex: 8, paddingLeft: 10, height:'100%', justifyContent: 'center', alignItems:'center'}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 16,
              fontFamily:'Helvetica',
              color: '#FFF',
              textAlign:'center',
              padding: 40
            }}>
            Earn 10,000 Points for Submitted Referral and $1,000 after firm sale
          </Text>
        </TouchableHighlight>


      </View>

      <View style={{flex: 1, flexDirection: 'column', alignItems:'center'}}>
        <Button
          backgroundColor={'#35AFC8'}
          title={'Learn More'}
          onPress={this.props.onReferClick}
          textStyle={{
            fontSize: 14,
            fontWeight: 'bold',
            textAlign: 'center',
            fontFamily:'Helvetica'
          }}
        />
      </View>
    </ImageBackground>
    </View>
  }


  renderTitle() {
    return (
      <View style={{flex: 1, width: '100%'}}>
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <Avatar
            medium
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
            source={{
              uri: this.props.clientLogo,
            }}
            containerStyle={{flex: 1, margin: 10}}
          />
        </View>
      </View>);

  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderTitle()}
        {this.renderImage()}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300
  }
})