import React, {Component} from 'react';
import {View, StyleSheet, Image, ImageBackground, TouchableHighlight} from 'react-native';
import {Text, Button, Card, Icon} from "react-native-elements";
import PropTypes from 'prop-types';
import { Avatar } from 'react-native-elements';

class ClientCard extends Component {

  static propTypes = {
    // componentId: PropTypes.string.isRequired,
    clientId : PropTypes.number.isRequired,
    clientName : PropTypes.string.isRequired,
    clientDescription : PropTypes.string,
    clientImage : PropTypes.string.isRequired,
    clientLogo : PropTypes.string.isRequired,

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

    // return <ImageBackground source={{uri: this.props.clientImage}} style={{ marginBottom: 10}}>
    //   <View style={{flex: 1, flexDirection: 'row', alignItems: 'center',  height: 70,}}>
    //     <View style={{flex: 2, height:'100%',backgroundColor: '#FFF', }}>
    //       <TouchableHighlight activeOpacity={0} style={{ height:'100%'}} onPress={this.onClientClick}>
    //         <Avatar
    //           medium
    //           rounded
    //           title="CR"
    //           onPress={() => console.log("Works!")}
    //           activeOpacity={0.7}
    //           source={{
    //             uri: this.props.clientLogo,
    //           }}
    //           containerStyle={{flex: 1, margin: 10}}
    //         />
    //       </TouchableHighlight>
    //     </View>
    //     <TouchableHighlight activeOpacity={0} onPress={this.onClientClick} style={{flex: 8, paddingLeft: 10, height:'100%', justifyContent: 'center', }}>
    //       <Text style={{fontWeight: 'bold', fontSize: 16, fontFamily:'Helvetica',  color: '#FFF'}}>{this.props.clientName}</Text>
    //     </TouchableHighlight>
    //
    //
    //   </View>
    //
    //   <View style={{flex: 1, flexDirection: 'column',  height: 80, paddingLeft: '50%', marginTop: 25, }}>
    //     <Button
    //       backgroundColor={'#35AFC8'}
    //       title={'Follow'}
    //       onPress={() => { alert('You are following the brand now!');}}
    //       textStyle={{
    //         fontSize: 14,
    //         fontWeight: 'bold',
    //         textAlign: 'center',
    //         fontFamily:'Helvetica'
    //       }}
    //     />
    //   </View>
    // </ImageBackground>

    // return <View style={{width:'50%', height: '50%'}}>
    // <Card
    //   title={this.props.clientName}
    //   image={{uri: this.props.clientLogo}}>
    //   <Text style={{marginBottom: 10}}>
    //     {this.props.clientDescription}
    //   </Text>
    //   <Button
    //     icon={<Icon name='code' color='#ffffff' />}
    //     backgroundColor='#35AFC8'
    //     buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
    //     title='Unfollow' />
    // </Card>
    // </View>

    return <View style={{width:160, height:200, marginHorizontal:12, marginVertical:15}}>
      <View style={{height:'25%', textAlignVertical:'bottom', justifyContent:'flex-end'}}>
      <Text style={{paddingHorizontal:20, paddingVertical:10, fontWeight:'bold', fontSize:12, textAlignVertical:'center'}} multiline={true}>{this.props.clientName}</Text>
      </View>
      <View style={{marginHorizontal: 15, padding:10, height:'62.5%', borderWidth:1}}>
        <Image
          style={{width: '100%', height: '100%'}}
          source={{ uri:this.props.clientLogo }}
        />
      </View>
        <Button
          backgroundColor={'#35AFC8'}
          title={'Unfollow'}
          onPress={() => { alert('You are following the brand now!');}}
          textStyle={{
            fontSize: 14,
            fontWeight: 'bold',
            textAlign: 'center',
            fontFamily:'Helvetica'
          }}
        />
    </View>


  }


}

export default ClientCard;