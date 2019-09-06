import React from 'react'
import {
  View,
  StyleSheet,
  Linking
} from 'react-native'
import {Navigation} from 'react-native-navigation';
import PropTypes from "prop-types";
import CommonUtils from "../CommonUtils";
import {Button, Avatar, ListItem} from "react-native-elements";
import {goToAuth} from "../navigation";
import BelieverRequestController from "../controllers/BelieverRequestController";
import {CLOUDINARY_BASE_URL} from "../config";

export default class EditProfile extends React.Component {

  static propTypes = {
    componentId: PropTypes.string.isRequired,
  };

  static get options() {
    return {
      topBar: {
        backButton: {
          color: "white",
          fontFamily: "Nunito",
          fontSize: 12,
          title: "Back"
        },
        title: {
          text: 'Profile',
          color: 'white',
        },
      },
    };
  }
  
  constructor(props, context) {
    super(props, context);
    Navigation.events().bindComponent(this);
    this.logout = this.logout.bind(this);
    this.believerRequestController = new BelieverRequestController();
    this.state = {
      profile:null,
    }
    this.handleClickProfile = this.handleClickProfile.bind(this);
    this.handleClickContact = this.handleClickContact.bind(this);
    this.handleClickMissionHistory = this.handleClickMissionHistory.bind(this);
    this.menuItems = [
      {
        componentName: 'UpdateUsername'
      },
      {
        componentName: 'UpdateContact'
      },
      {
        componentName: 'UpdatePassword'
      },
    ]
  }

  async componentDidAppear() {

    CommonUtils.setCurrentActiveTab(this.props.componentId);
    try {
      let profile = await this.believerRequestController.getUserProfile();
      this.setState({profile});
    }
    catch(e) {
      throw e;
    }
  }

  async componentDidMount() {
    try {
      let profile = await this.believerRequestController.getUserProfile();
      this.setState({profile});
    }
    catch(e) {
      throw e;
    }

  }


  async logout() {
    try {
      await CommonUtils.clearLoginToken();
      await CommonUtils.clearUserId();
      goToAuth()
    } catch (err) {
      console.log('error signing out...: ', err)
    }
  }

  async handleClickProfile(item, title) {
    try {
      Navigation.push(this.props.componentId, {
        component: {
          name: 'UpdateUsername',
          passProps: {
            firstName: item.first,
            lastName: item.last,
          },
          options: {
            topBar: {
              visible: true,
              title: {
                title
              }
            }
          }
        }
      });
    }
    catch(e){
      throw e;
    }
  }

  async handleClickContact(item, title) {
    try {
      Navigation.push(this.props.componentId, {
        component: {
          name: 'UpdateContact',
          passProps: {
            address: item.address1,
            city: item.city,
            province: item.province,
            postalCode: item.postal_code,
            phone: item.phone1,

          },
          options: {
            topBar: {
              visible: true,
              title: {
                title
              }
            }
          }
        }
      });
    }
    catch(e){
      throw e;
    }
  }

  async handleClickManageBrands() {
    try {
      Navigation.push(this.props.componentId, {
        component: {
          name: 'Following',
          options: {
            topBar: {
              visible: true,
              // title: {
              //   title
              // }
            }
          }
        }
      });
    }
    catch(e){
      throw e;
    }
  }

  async handleClickMissionHistory() {
    try {
      Navigation.push(this.props.componentId, {
        component: {
          name: 'MissionHistory',
          options: {
            topBar: {
              visible: true,
              // title: {
              //   title
              // }
            }
          }
        }
      });
    }
    catch(e){
      throw e;
    }
  }

  render() {
    if(!this.state.profile) {
      return null;
    }
    return <View style={{flex:1}}>
      <View style={{ flex:1.1, backgroundColor: '#e6e7e8', alignItems:'center'}}/>
      <View style={{flex:0.5, alignItems:'center', bottom:80}}>
        <Avatar
          xlarge
          rounded
          title="CR"
          activeOpacity={0.7}
          source={{
            uri: CLOUDINARY_BASE_URL + this.state.profile.image
          }}
        />
      </View>
      <View style={{flex:5.2}}>
        <View style={styles.listViewContainerStyle}>
          <ListItem
            key={1}
            title={this.state.profile.name}
            subtitle={this.state.profile.email}
            containerStyle={{borderBottomWidth:0}}
            onPress={() => this.handleClickProfile(this.state.profile, 'Update Username')}
          />
        </View>
        <View style={styles.listViewContainerStyle}>
          <ListItem
            key={2}
            title={this.state.profile.address1}
            subtitle={
              `${this.state.profile.city}, ${this.state.profile.province} (${this.state.profile.postal_code}) \n${this.state.profile.phone1}`
            }
            subtitleNumberOfLines={2}
            textInputMultiline={true}
            containerStyle={{borderBottomWidth:0}}
            onPress={() => this.handleClickContact(this.state.profile, 'Update Contact')}
          />
        </View>

        <View style={styles.listViewContainerStyle}>
          <ListItem
            key={4}
            title={'Update Password'}
            containerStyle={{borderBottomWidth:0}}
            onPress={()=>{ Linking.openURL('https://gamegraft.com/password/reset')}}
          />
        </View>

        <View style={styles.listViewContainerStyle}>
          <ListItem
            key={4}
            title={'Manage Brands'}
            containerStyle={{borderBottomWidth:0}}
            onPress={()=> this.handleClickManageBrands() }
          />
        </View>

        <View style={styles.listViewContainerStyle}>
          <ListItem
            key={4}
            title={'View Completed Missions'}
            containerStyle={{borderBottomWidth:0}}
            onPress={()=> this.handleClickMissionHistory() }
          />
        </View>

      </View>
      <View style={{flex:1, flexDirection: 'row'}}>
        <View style={{flex:1, justifyContent: 'center', marginHorizontal:50}}>
        <Button
          backgroundColor={'#35AFC8'}
          title={'Logout'}
          onPress={this.logout}
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
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    height: '100%',
    backgroundColor: '#e9e9e9',
    fontFamily: 'Helvetica'
  },
  listViewContainerStyle:{
    paddingVertical:15,
    borderBottomColor:'#e6e7e8',
    borderBottomWidth:1
  },
})