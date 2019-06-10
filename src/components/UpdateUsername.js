import React, {Component} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import PropTypes from 'prop-types';
import BelieverRequestController from "../controllers/BelieverRequestController";
import {Button, Text} from "react-native-elements";
class UpdateUsername extends Component {

  static propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.believerRequestController = new BelieverRequestController();
    this.saveChanges = this.saveChanges.bind(this);
    this.onChangeText = this.onChangeText.bind(this);

  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  saveChanges() {
    console.log(this.state);
  }

  render() {
    return <View style={styles.container}>
      <View style={{flex:1, }}>
        <View style={{flex:1, flexDirection: 'row' , height: 60}}>
          <Text style={{ flex:1, paddingTop: 25, paddingLeft: 10}}>
            First Name
          </Text>
          <View style={{ flex:3}}>
          <TextInput
            value={this.props.firstName}
            style={styles.input}
            autoCapitalize="none"
            placeholderTextColor='#939495'
            onChangeText={val => this.onChangeText('firstName', val)}
          />
          </View>
        </View>
        <View style={{flex:1, flexDirection: 'row', height: 60}}>
          <Text style={{flex: 1, paddingTop: 25, paddingLeft: 10}}>
            Last Name
          </Text>
          <View style={{ flex:3}}>
          <TextInput
            value={this.props.lastName}
            style={styles.input}
            autoCapitalize="none"
            placeholderTextColor='#939495'
            onChangeText={val => this.onChangeText('lastName', val)}
          />
          </View>
        </View>
        <View style={{flex:1, flexDirection: 'row'}}>
          <View style={{flex:1, justifyContent: 'center', marginHorizontal:50}}>
            <Button
              backgroundColor={'#35AFC8'}
              title={'Save Changes'}
              onPress={() => this.saveChanges}
              textStyle={{
                fontSize: 14,
                fontWeight: 'bold',
                textAlign: 'center',
                fontFamily:'Helvetica'
              }}
            />
          </View>
        </View>
      </View>

      <View style={{flex:2,}}>
      </View>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
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