// SignIn.js
import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  AsyncStorage,
  TouchableHighlight,
  Button
} from 'react-native'

import {goHome, goSignup} from '../navigation'
// import { USER_KEY } from '../config'
import BelieverRequestController from "../controllers/BelieverRequestController";


export default class SignIn extends React.Component {


  constructor(props, context) {
    super(props, context);
    this.state = {
      email: '', password: ''
    }
    this.believerRequestController = new BelieverRequestController();
    this.signIn = this.signIn.bind(this);

  }

  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }

  async signIn() {
    const { email, password } = this.state;
    try {
      await this.believerRequestController.login({email, password});
      goHome();
    } catch (err) {
      console.log('error:', err)
    }
  }
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.title}>
          <Text style={styles.titleText}> BELIEVER </Text>
        </View>

        <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder='Email'
          placeholderTextColor="#939495"
          autoCapitalize="none"
          autoCorrect={false}
          // placeholderTextColor='white'
          onChangeText={val => this.onChangeText('email', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          placeholderTextColor="#939495"
          autoCapitalize="none"
          secureTextEntry={true}
          // placeholderTextColor='white'
          onChangeText={val => this.onChangeText('password', val)}
        />

        <TouchableHighlight
          style={styles.login}
          onPress={this.signIn}
          >
          <Text style={styles.loginText}>Sign In</Text>
        </TouchableHighlight>

        <TouchableHighlight>
          <Text style={{color: '#35AFC8'}}>Forgot your password?</Text>
        </TouchableHighlight>
        </View>

        <View style={styles.signup}>
          <Text>Don't have an account yet?</Text>
          <TouchableHighlight onPress= { () => goSignup() }>
          <Text style={{color: '#35AFC8'}}> Sign Up
          </Text>
        </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',

  },

  title:{
    flex:1,
    width : '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText:{
    paddingTop:100,
    fontSize:40,
    fontWeight :'900',

  },
  formContainer:{
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%'
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
    padding: 8,
    borderRadius: 2,
    borderWidth: 1,

  },
  login:{
    width: '80%',
    height: 55,
    backgroundColor: '#231F20',
    margin: 12,
    // marginTop:50,
    padding: 8,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText:{
    fontSize: 18,
    fontWeight: '500',
    color: '#FFF',
  },
  signup:{
    flex:1,
    flexDirection: 'row',
  }


})