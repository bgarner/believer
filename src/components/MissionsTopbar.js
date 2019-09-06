import React, {Component} from "react";
import {View, Image} from 'react-native';
import {Navigation} from "react-native-navigation";

export default class MissionsTopbar extends Component {

  constructor(props, context) {
    super(props, context);
    Navigation.events().bindComponent(this);
  }

// state = { orientation: 'P' };
//   componentDidAppear() {
//     Navigation.mergeOptions(this.props.componentId, {
//       topBar: {
//         drawBehind: true,
//         title: {
//           component: {
//             name: 'MissionsTopbar',
//             alignment: 'center'
//           }
//         },
//       }
//     });
//   }

  render() {
    return <View style={styles.container}>
      <Image source={require('../../assets/topbar.png')} />
    </View>
  }

}


const styles = {
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // alignSelf: 'center',
    backgroundColor: '#000',
    width: '100%'
  },
  // icon: {
  //   height:20,
  //   // width:'20%'
  // }
};