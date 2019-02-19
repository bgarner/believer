// SignUp.js
import React from 'react'
import {
  View,
  Button,
  TextInput,
  StyleSheet, Text, TouchableHighlight
} from 'react-native'
import {goToAuth} from "../navigation";

export default class SignUp extends React.Component {
  state = {
    username: '', password: '', email: ''
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  signUp = async () => {
    const { username, password, email } = this.state
    try {
      // here place your signup logic
      console.log('user successfully signed up!: ', success)
    } catch (err) {
      console.log('error signing up: ', err)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Create an Account</Text>
        <TextInput
          style={styles.input}
          placeholder='Full Name'
          autoCapitalize="none"
          placeholderTextColor='#939495'
          onChangeText={val => this.onChangeText('name', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Username'
          autoCapitalize="none"
          placeholderTextColor='#939495'
          onChangeText={val => this.onChangeText('username', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='#939495'
          onChangeText={val => this.onChangeText('email', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='#939495'
          onChangeText={val => this.onChangeText('password', val)}
        />

        <View style={styles.signIn}>
          <Text>Already have an account?</Text>
          <TouchableHighlight onPress= { () => goToAuth() }>
            <Text style={{color: '#35AFC8'}}> Log in
            </Text>
          </TouchableHighlight>
        </View>

        <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          By creating an account you agree to our Terms of Service and Privacy Policy.
        </Text>
        </View>
        <TouchableHighlight
          style={styles.signup}
          onPress={this.signUp}
        >
          <Text style={styles.signupText}>Continue</Text>
        </TouchableHighlight>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title:{
    fontSize:24,
    margin:20,
    fontWeight :'900'
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
  signup:{
    width: '80%',
    height: 55,
    backgroundColor: '#231F20',
    margin: 12,
    padding: 8,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText:{
    fontSize: 18,
    fontWeight: '500',
    color: '#FFF',
  },
  disclaimer:{
    width: '65%',
    marginTop:50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disclaimerText:{
    color: '#b3b4b5',
    fontSize:12,
    fontStyle: 'italic',
  },
  signIn:{
    flexDirection: 'row',
  }

})