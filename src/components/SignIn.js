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



import { goHome } from '../navigation'
import { USER_KEY } from '../config'
// import {Button} from "react-native-elements";

export default class SignIn extends React.Component {
  state = {
    email: '', password: ''
  }
  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }
  signIn = async () => {
    const { email, password } = this.state
    try {
      // login with provider
      const user = await AsyncStorage.setItem(USER_KEY, email)
      console.log('user successfully signed in!', user)
      goHome()
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

        <Button
          title={'Forgot your password?'}
          color= {'#35AFC8'}
        >
        </Button>
        </View>

        <View style={{flex:1}}>
          <Text>Don't have an account yet?</Text>
          <Button
            title={'Sign Up'}
            color= {'#35AFC8'}
          >
          </Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',

  }
})