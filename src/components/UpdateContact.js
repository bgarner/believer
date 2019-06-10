import React, {Component} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import PropTypes from 'prop-types';
import BelieverRequestController from "../controllers/BelieverRequestController";
import {Button, Text} from "react-native-elements";
class UpdateContact extends Component {

  static propTypes = {
    // firstName: PropTypes.string.isRequired,
    // lastName: PropTypes.string.isRequired,
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
      <View style={{flex:2, }}>
        <View style={{flex:1, flexDirection: 'row' , height: 60}}>
          <Text style={{ flex:1, paddingTop: 25, paddingLeft: 10}}>
            Address
          </Text>
          <View style={{ flex:3}}>
            <TextInput
              value={this.props.address}
              style={styles.input}
              autoCapitalize="none"
              placeholderTextColor='#939495'
              onChangeText={val => this.onChangeText('address1', val)}
            />
          </View>
        </View>
        <View style={{flex:1, flexDirection: 'row', height: 60}}>
          <Text style={{flex: 1, paddingTop: 25, paddingLeft: 10}}>
            City
          </Text>
          <View style={{ flex:3}}>
            <TextInput
              value={this.props.city}
              style={styles.input}
              autoCapitalize="none"
              placeholderTextColor='#939495'
              onChangeText={val => this.onChangeText('city', val)}
            />
          </View>
        </View>
        <View style={{flex:1, flexDirection: 'row', height: 60}}>
          <Text style={{flex: 1, paddingTop: 25, paddingLeft: 10}}>
            Province
          </Text>
          <View style={{ flex:3}}>
            <TextInput
              value={this.props.province}
              style={styles.input}
              autoCapitalize="none"
              placeholderTextColor='#939495'
              onChangeText={val => this.onChangeText('province', val)}
            />
          </View>
        </View>
        <View style={{flex:1, flexDirection: 'row', height: 60}}>
          <Text style={{flex: 1, paddingTop: 25, paddingLeft: 10}}>
            Postal Code
          </Text>
          <View style={{ flex:3}}>
            <TextInput
              value={this.props.postal_code}
              style={styles.input}
              autoCapitalize="none"
              placeholderTextColor='#939495'
              onChangeText={val => this.onChangeText('postal_code', val)}
            />
          </View>
        </View>

        <View style={{flex:1, flexDirection: 'row', height: 60}}>
          <Text style={{flex: 1, paddingTop: 25, paddingLeft: 10}}>
            Phone
          </Text>
          <View style={{ flex:3}}>
            <TextInput
              value={this.props.phone}
              style={styles.input}
              autoCapitalize="none"
              placeholderTextColor='#939495'
              onChangeText={val => this.onChangeText('phone1', val)}
            />
          </View>
        </View>
        <View style={{flex:1, flexDirection: 'row'}}>
          <View style={{flex:1, justifyContent: 'center', marginHorizontal:50}}>
            <Button
              backgroundColor={'#35AFC8'}
              title={'Save Changes'}
              onPress={this.saveChanges}
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
      <View style={{flex:1}}>
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



export default UpdateContact;