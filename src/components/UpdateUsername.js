import React, {Component} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import PropTypes from 'prop-types';
import BelieverRequestController from "../controllers/BelieverRequestController";
import {Text} from "react-native-elements";
class UpdateUsername extends Component {

  static propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.believerRequestController = new BelieverRequestController();

  }

  render() {
    return <View style={styles.container}>
      <View style={{flex:1, flexDirection: 'row'}}>
        <Text style={{flex:1}}>
          First Name
        </Text>
        <TextInput
          value={this.props.firstName}
          style={styles.input}
          // placeholder="Friend's First Name"
          autoCapitalize="none"
          placeholderTextColor='#939495'
          onChangeText={val => this.onChangeText('firstName', val)}
        />
      </View>
      <View style={{flex:1, flexDirection: 'row'}}>
        <Text style={{flex:1}}>
          Last Name
        </Text>
        <TextInput
          value={this.props.lastName}
          style={styles.input}
          // placeholder="Friend's Last Name"
          autoCapitalize="none"
          placeholderTextColor='#939495'
          onChangeText={val => this.onChangeText('lastName', val)}
        />
      </View>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column',
    // alignItems: 'center',
    // height:'100%'
  },
  input: {
    // width: '50%',
    flex:1,
    fontSize: 18,
    fontWeight: '500',
    height: 55,
    backgroundColor: '#fff',
    borderColor: '#939495',
    margin: 10,
    color: '#939495',
    padding: 10,
    borderRadius: 2,
    borderWidth: 1,

  },
})



export default UpdateUsername;