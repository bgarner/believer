import React, {Component} from 'react';
import {View, StyleSheet, Image, ImageBackground, TouchableHighlight} from 'react-native';
import {Text, Button} from "react-native-elements";
import PropTypes from 'prop-types';
import { Avatar } from 'react-native-elements';

class Client extends Component {

  static propTypes = {
    // componentId: PropTypes.string.isRequired,
    clientId : PropTypes.number.isRequired,
    clientName : PropTypes.string.isRequired,
    clientDescription : PropTypes.string,
    clientImage : PropTypes.string.isRequired,
    clientLogo : PropTypes.string.isRequired,
    // onClientClick : PropTypes.func,

  };

  constructor(props, context) {
    super(props, context);
    this.onClientClick = this.onClientClick.bind(this);

  }

  onClientClick() {
    if (this.props.onClientClick) {
      this.props.onClientClick();
    }
  }

  render() {

    return <ImageBackground source={{uri: this.props.clientImage}} style={{ marginBottom: 10}}>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center',  height: 70,}}>
        <View style={{flex: 2, height:'100%',backgroundColor: '#FFF', }}>
          <TouchableHighlight activeOpacity={0} style={{ height:'100%'}} onPress={this.onClientClick}>
            <Avatar
              medium
              rounded
              title="CR"
              onPress={() => console.log("Works!")}
              activeOpacity={0.7}
              source={{
                uri: this.props.clientLogo,
              }}
              containerStyle={{flex: 1, margin: 10}}
            />
          </TouchableHighlight>
        </View>
        <TouchableHighlight activeOpacity={0} onPress={this.onClientClick} style={{flex: 8, paddingLeft: 10, height:'100%', justifyContent: 'center', }}>
            <Text style={{fontWeight: 'bold', fontSize: 16, fontFamily:'Helvetica',  color: '#FFF'}}>{this.props.clientName}</Text>
        </TouchableHighlight>


      </View>

      <View style={{flex: 1, flexDirection: 'column',  height: 80, paddingLeft: '50%', marginTop: 25, }}>
          <Button
            backgroundColor={'#35AFC8'}
            title={'Follow'}
            onPress={() => { alert('You are following the brand now!');}}
            textStyle={{
              fontSize: 14,
              fontWeight: 'bold',
              textAlign: 'center',
              fontFamily:'Helvetica'
            }}
          />
      </View>
    </ImageBackground>


  }


}

export default Client;