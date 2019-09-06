import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Image, Linking} from 'react-native';
import PropTypes from 'prop-types';
import {Avatar, Button, Text} from "react-native-elements";
import { WebView } from 'react-native-webview';
import BelieverRequestController from "../controllers/BelieverRequestController";
import {CLOUDINARY_BASE_URL} from "../config";

class Message extends Component {

  static propTypes = {
    componentId: PropTypes.string.isRequired,
    messageId : PropTypes.number.isRequired,
  };

  static get options() {
    return {
      topBar: {
        backButton: {
          color: "white",
          fontFamily: "Nunito",
          fontSize: 12,
          title: "Back"
        },
        title: {
          text: 'Inbox',
          color: 'white',
        },
      },
    };
  }

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
              source={{ uri: CLOUDINARY_BASE_URL + this.state.message.banner}}
              style={{width:'100%', height: '100%'}} />
          </View>
        );
      // }
    // }
    // return null;

  }

  renderMessageText() {
    console.log(this.state.message.body)
    return (
      <WebView
        scrollEnabled={true}
        originWhitelist={['*']}
        source={{ html: `<style type="text/css">*{ font-size: 30px; line-height: 40px; color: #333; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; }</style>` + `<div style="padding: 5px 15px; overflow: scroll;">` + this.state.message.body + `</div>` }}
      />
    );
  }

  render() {
    if(! this.state.message){
      return null;
    }
    return (
      <ScrollView styles={{flex:1, height: '100%'}}>


          <View style={{flex:1, justifyContent:'center', flexDirection: 'row', alignItems: 'center', borderBottomWidth:1, borderColor: '#E6E7E8', margin:10, paddingBottom: 10}}>

            <View style={{flex: 1, justifyContent:'flex-start', height:'100%',backgroundColor: '#FFF', }}>
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

            <View style={{flex: 3, paddingLeft: 10, height:'100%', justifyContent: 'flex-start', paddingTop: 20  }}>
              <Text style={{ fontSize: 14,  color: '#000'}}>{this.state.message.brand_name}</Text>
              <Text style={{ fontSize: 10,  color: '#9c9d9e', paddingTop:3}}>{this.state.message.created_at}</Text>
            </View>

          </View>

          <View style={{flex:1, flexDirection: 'row', paddingLeft:20, paddingTop:5, paddingBottom: 5}}>
            <Text style={{ fontWeight:'bold', fontFamily: 'Helvetica'}}>
              {this.state.message.subject}
            </Text>
          </View>



        <View style={{ height:'100%'}}>
          <View style={{flex:1, minHeight:60, flexDirection: 'row'}}>
            {this.renderMessageImage()}
          </View>

          <View style={{ flex:1, justifyContent: 'flex-start', minHeight:310, overflow:'scroll', paddingBottom:10}}>
            {this.renderMessageText()}
          </View>

          <View style={{flex:1, flexDirection: 'row' , justifyContent:'space-around'}}>
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