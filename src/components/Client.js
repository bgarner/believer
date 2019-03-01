import React, {Component} from 'react';
import {Button, View, StyleSheet, Image, ImageBackground, TouchableHighlight} from 'react-native';
import {Text} from "react-native-elements";
import PropTypes from 'prop-types';
import { Avatar } from 'react-native-elements';

class Client extends Component {

  static propTypes = {
    componentId: PropTypes.string.isRequired,
    clientId : PropTypes.number.isRequired,
    clientName : PropTypes.string.isRequired,
    clientDescription : PropTypes.string.isRequired,
    clientImage : PropTypes.string.isRequired,
    clientLogo : PropTypes.string.isRequired,
    // onClientClick : PropTypes.func,

  };

  constructor(props, context) {
    super(props, context);
    // this.onClientClick = this.onClientClick.bind(this);

  }

  // onClientClick() {
  //   if (this.props.onClientClick) {
  //     this.props.onClientClick();
  //   }
  // }

  render() {

    const resizeMode = 'center';

    return <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', height: 100, /*borderColor: 'red', borderWidth: 1,*/ padding: 10}}>
      <View style={{flex: 2.6, /*borderColor: 'blue', borderWidth: 1*/}}>
        <TouchableHighlight activeOpacity={0} /*onPress={this.onBrandClick}*/>
          <Avatar
            large
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
      <View style={{flex: 7, paddingLeft: 10, /*borderColor: 'blue', borderWidth: 1,*/ height:'100%', justifyContent: 'center'}}>
        <TouchableHighlight activeOpacity={0} onPress={this.onBrandClick}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>{this.props.clientName}</Text>
        </TouchableHighlight>
      </View>
      <View style={{flex: 2.5, alignItems: 'center', /*borderColor: 'blue', borderWidth: 1*/}}>
        <Button title={'Follow'} ></Button>
      </View>

    </View>
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

export default Client;