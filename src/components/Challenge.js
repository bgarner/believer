import React, {Component} from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Image } from 'react-native';
import {Text} from "react-native-elements";
import BelieverRequestController from "../controllers/BelieverRequestController";
import HttpRequestController from "../controllers/HttpRequestController";
import {Navigation} from "react-native-navigation";
import PropTypes from 'prop-types';
import { Avatar } from 'react-native-elements';

class Challenge extends Component {
  // static propTypes = {
  //   // componentId: PropTypes.string.isRequired,
  // };

  constructor(props, context) {
    super(props, context);
    // Navigation.events().bindComponent(this);

  }
  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderImage()}
        {this.renderDescription()}
      </View>
    );
  }


  renderHeader() {
    return <View style={{flex: 0.2, flexDirection: 'row', alignItems: 'center', /*borderColor: 'blue', borderWidth: 1,*/ padding: 10}}>
      <View style={{flex: 0.1 }}>
        <Avatar
          size="xlarge"
          rounded
          title="CR"
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
        />
      </View>
      <View style={{flex: 0.8, paddingLeft: 10}}>
        <Text style={{fontWeight: 'bold'}}>Challenge Title</Text>
      </View>
      <View style={{flex: 0.1, alignItems: 'flex-end'}}>
        <Text>...</Text>
      </View>

    </View>
  }

  renderImage() {

    return <Image source= {'https://www.fairmont.com/assets/0/137/9768/9827/9829/14353/edd35485-f1b1-4495-a469-25a7a453106f.jpg'} style={styles.imageStyle} />
  }
  renderDescription() {
    return <View style={{flex:0.10, padding: 15, backgroundColor: '#f2f2f2',  /*borderColor: 'red', borderWidth: 1*/}}>

      <Text style={{ lineHeight: 30, fontWeight: 'bold' }}>Mission Title</Text>

      <Text style={{ paddingTop: 10, paddingBottom: 10 }}>Lorem ipsum dolor sit amet, esse vulputate referrentur ut mel, est oporteat quaerendum in. Ex reque quaestio aliquando est, accumsan consectetuer est id. An unum accusam repudiandae est, cum natum splendide ut.</Text>
    </View>
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    // borderColor: 'black', borderWidth: 1,
    fontFamily: 'Helvetica'
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  }
});

export default Challenge;