import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Image, Linking} from 'react-native';
import PropTypes from 'prop-types';
import {Avatar, Button, Text} from "react-native-elements";
import BelieverRequestController from "../controllers/BelieverRequestController";
import {CLOUDINARY_BASE_URL} from "../config";

class Message extends Component {
  static propTypes = {
    componentId: PropTypes.string.isRequired,
    messageId : PropTypes.number.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.believerRequestController = new BelieverRequestController();
    this.renderMessageImage = this.renderMessageImage.bind(this);
    this.state= {
      message: null,
    }
  }

  async componentDidMount() {

    try {
      let message = await this.believerRequestController.getMessage(this.props.messageId);
      this.setState({
        message,
        clientLogo: CLOUDINARY_BASE_URL + message.brand_logo,
      });
    }
    catch(e) {
      throw e;
    }

  }


  renderMessageImage() {
    // if(this.state.message) {
    //   if(this.state.message.messageImage) {
    //     return (
    //       <View style={{flex:2.5}}>
    //         <Image
    //           source={{uri: this.state.message.messageImage}}
    //           style={{width:'100%', height: '100%'}} />
    //       </View>
    //     );
    //   }
    //   else{
        return (
          <View style={{flex:2.5}}>
            <Image
              source={{ uri: this.state.clientLogo}}
              style={{width:'100%', height: '100%'}} />
          </View>
        );
      // }
    // }
    // return null;

  }

  render() {
    if(! this.state.message){
      return null;
    }
    return (
      <ScrollView styles={{flex:1}}>
        <View style={styles.container}>

          <View style={{flex:1.75, flexDirection: 'row', alignItems: 'center', borderBottomWidth:1, borderColor: '#E6E7E8', margin:10}}>
            <View style={{flex: 2, height:'100%',backgroundColor: '#FFF', }}>
              <Avatar
                large
                rounded
                title="CR"
                onPress={() => console.log("Works!")}
                activeOpacity={1}
                source={{
                  uri: this.state.clientLogo
                }}

              />
            </View>
            <View style={{flex: 6, paddingLeft: 10, height:'100%', justifyContent: 'flex-start', paddingTop: 20  }}>
              <Text style={{ fontSize: 14,  color: '#000'}}>{this.state.message.brand_name}</Text>
              <Text style={{ fontSize: 10,  color: '#9c9d9e', paddingTop:3}}>{this.state.message.created_at}</Text>
            </View>
          </View>
          <View style={{flex:0.8, flexDirection: 'row', paddingLeft:20, paddingTop:10}}>
            <Text style={{ fontWeight:'bold', fontFamily: 'Helvetica'}}>
              {this.state.message.subject}
            </Text>

          </View>
          {this.renderMessageImage()}
          <View style={{flex:2, alignItems: 'center', padding: 20, textAlign: 'center', fontFamily: 'Helvetica'}}>
            <View>
              <Text style={{lineHeight:16, color:'#000'}}>{this.state.message.body}</Text>
            </View>
          </View>

          <View style={{flex:1.5, alignItems: 'center', padding: 20, textAlign: 'center', fontFamily: 'Helvetica'}}>
            <Button
              backgroundColor={'#35AFC8'}
              title={this.state.message.action_title}
              onPress={ ()=>{ Linking.openURL(this.state.message.action_url)} }
              textStyle={{
                fontSize: 14,
                fontWeight: 'bold',
                textAlign: 'center',
                fontFamily:'Helvetica'
              }}
            />
          </View>

        </View>
      </ScrollView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    fontFamily: 'Helvetica',
    height: 400
  },

});

export default Message;