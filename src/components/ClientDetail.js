import React, {Component} from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
import {Text, Button, SocialIcon} from "react-native-elements";
import {Navigation} from "react-native-navigation";
import PropTypes from 'prop-types';
import { Avatar, Icon } from 'react-native-elements';

class ClientDetail extends Component {

  static propTypes = {
    componentId: PropTypes.string.isRequired,
    clientId : PropTypes.number.isRequired,
    clientName : PropTypes.string.isRequired,
    clientDescription : PropTypes.string.isRequired,
    clientImage : PropTypes.string.isRequired,
    clientLogo : PropTypes.string.isRequired,


  };

  constructor(props, context) {
    super(props, context);
    Navigation.events().bindComponent(this);

  }

  render() {
    return (
      <ScrollView styles={{flex:1}}>
      <View style={styles.container}>
        <View style={{flex:2.5}}>
          <Image source={{uri: this.props.clientImage}}
                 style={{width:'100%', height: '100%'}} />
        </View>
        <View style={{flex:1.75, flexDirection: 'row', alignItems: 'center',}}>
          <View style={{flex: 3, height:'100%',backgroundColor: '#FFF', paddingLeft:20, paddingTop:15}}>
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
          </View>
          <View style={{flex: 7, paddingLeft: 10, height:'100%', justifyContent: 'center', }}>
            <Text style={{fontWeight: 'bold', fontSize: 14,  color: '#231F20'}}>{this.props.clientName}</Text>
          </View>
        </View>
        <View style={{flex:1, flexDirection: 'row',}}>
          <View style={{flex:1}}>
          <Button
            backgroundColor={'#35AFC8'}
            title={'Follow'}
            textStyle={{
              fontSize: 14,
              fontWeight: 'bold',
              textAlign: 'center',
              fontFamily:'Helvetica'
              }}
            onPress={() => { alert('You are following the brand now!');}}
          />
          </View>

          <View style={{flex:1}}>
          <Button
            backgroundColor={'#35AFC8'}
            title={'Share This'}
            onPress={() => { alert('You are sharing the brand now!');}}
            textStyle={{
              fontSize: 14,
              fontWeight: 'bold',
              textAlign: 'center',
              fontFamily:'Helvetica'
            }}
          />
          </View>


        </View>
        <View style={{flex:2, alignItems: 'center', padding: 10, paddingLeft: 20, paddingRight:20, textAlign: 'center', fontFamily: 'Helvetica'}}>
          <View>
          <Text>{this.props.clientDescription}</Text>
          </View>
          <View style={{ flex: 1.2, flexDirection: 'row', justifyContent: 'space-between', width: '60%' }}>
            <SocialIcon
              type='facebook'
            />
            <SocialIcon
              type='twitter'
            />
            <SocialIcon
              type='instagram'
            />
          </View>
        </View>

        <View style={{flex:6}}>

        </View>

      </View>
      </ScrollView>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#fff',
    // borderColor: 'black', borderWidth: 1,
    fontFamily: 'Helvetica',
    height: 1000,
    // borderColor: 'blue',
    // borderWidth: 1
  }
});

export default ClientDetail;