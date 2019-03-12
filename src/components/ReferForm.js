import React from 'react'
import {
  View,
  Text,
  StyleSheet, Image, ScrollView, TouchableHighlight, ImageBackground, TextInput,
} from 'react-native'
// import {Navigation} from 'react-native-navigation';
import BelieverRequestController from "../controllers/BelieverRequestController";
import {Button} from "react-native-elements";
import PropTypes from "prop-types";
import {goToAuth} from "../navigation";

export default class ReferForm extends React.Component {
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Refer '
        },
      }
    };
  }

  static propTypes = {
    clientId : PropTypes.number.isRequired,
    clientName : PropTypes.string.isRequired,
    clientDescription : PropTypes.string.isRequired,
    clientImage : PropTypes.string.isRequired,
    viewTitle : PropTypes.string.isRequired

  };

  constructor(props, context) {
    super(props, context);
    this.believerRequestController = new BelieverRequestController();

  }

  // async componentDidMount() {
  //   try {
  //     let user = await this.believerRequestController.getUserProfile();
  //     this.setState({user: user});
  //   }
  //   catch(e) {
  //     throw e;
  //   }
  // }

  renderImage() {
    return <View style={{flex:1, width: '100%',}}>
      <View style={{ flex:2, height:'100%', width:'100%',}}>
        <Image
          style={{width: '100%', height: '100%'}}
          source={{ uri:this.props.clientImage }}
        />
      </View>
      <View style={{flex:1, width:'100%', padding:10}}>
        <Text style={{fontSize:18, paddingHorizontal:15}}>
          {this.props.clientDescription}
        </Text>
      </View>
    </View>
  }

  renderForm() {
    return <View style={{flex:2, width:'100%' }}>
      <View style={{flex:1, paddingHorizontal: 0, width:'100%', alignItems: 'center'}}>
        <TextInput
          style={styles.input}
          placeholder="Friend's First Name"
          autoCapitalize="none"
          placeholderTextColor='#939495'
          onChangeText={val => this.onChangeText('firstname', val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Friend's Last Name"
          autoCapitalize="none"
          placeholderTextColor='#939495'
          onChangeText={val => this.onChangeText('lastname', val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Friend's Email"
          autoCapitalize="none"
          placeholderTextColor='#939495'
          onChangeText={val => this.onChangeText('email', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Sales Contact'
          autoCapitalize="none"
          placeholderTextColor='#939495'
          onChangeText={val => this.onChangeText('sales_contact', val)}
        />

        <View style={{marginTop: 30 }}>
        <Button
          backgroundColor={'#35AFC8'}
          title={'Send'}
          // onPress={() => { alert('You are following the brand now!');}}
          textStyle={{
            fontSize: 16,
            width:'60%',
            // fontWeight: 'bold',
            textAlign: 'center',
            fontFamily:'Helvetica'
          }}
        />
        </View>
      </View>


    </View>
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderImage()}
        {this.renderForm()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    height:'100%'
  },
  input: {
    width: '80%',
    fontSize: 18,
    fontWeight: '500',
    height: 55,
    backgroundColor: '#fff',
    borderColor: '#939495',
    margin: 10,
    color: '#939495',
    padding: 20,
    borderRadius: 2,
    borderWidth: 1,

  },
})