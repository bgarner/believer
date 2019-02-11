import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import BelieverRequestController from "../../controllers/BelieverRequestController";
import {Navigation} from 'react-native-navigation';

export default class Login extends Component {
  static propTypes = {
    componentId: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.believerRequestController = new BelieverRequestController();
  }

  onLogin() {
    const { email, password } = this.state;
    return new Promise((resolve, reject) => {
      return this.believerRequestController.login({email, password})
        .then(() => {
          Navigation.dismissModal(this.props.componentId);
          return resolve();
        })
        .catch(err => {
          return reject(err);
        });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
          placeholder={'Email'}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />

        <Button
          title={'Login'}
          style={styles.input}
          onPress={this.onLogin.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});
