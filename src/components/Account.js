import React from 'react'
import {
  View,
  Text,
  StyleSheet, ScrollView, TouchableHighlight
} from 'react-native'
import {Navigation} from 'react-native-navigation';
import PropTypes from "prop-types";
import CommonUtils from "../CommonUtils";
import {SocialIcon, Button} from "react-native-elements";
import { LoginButton } from 'react-native-fbsdk';

export default class Account extends React.Component {

  static propTypes = {
    componentId: PropTypes.string.isRequired,
  };

  static get options() {
    return {
      topBar: {
        title: {
          text: 'Accounts'
        },
        leftButtons: [
          {
            id: 'sideMenuHamburger',
            icon: require('../../assets/menu-button.png'),
            color: 'white',
          }
        ],
      }
    };
  }

  constructor(props, context) {
    super(props, context);
    Navigation.events().bindComponent(this);


  }

  componentDidAppear() {
    console.log('Account');
    console.log(this.props.componentId);
    CommonUtils.setCurrentActiveTab(this.props.componentId);

  }

  renderAccount(item) {
    return <View key={item.accountType} style={{flex:1, backgroundColor:'#fff', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom:25, paddingHorizontal: 10 , borderRadius: 3}}>
      <View style={{ flex:1, }}>
        <SocialIcon
          type={item.iconName}

        />
      </View>
      <View style={{ flex:3,  textAlign: 'left',  paddingLeft:20}}>
        <Text style={{fontSize: 12, fontWeight: 'bold'}}>
          {item.accountType}
        </Text>
        <Text style={{ fontSize: 10, color: '#9c9d9e'}}>
          Your account is {item.accountStatus}
        </Text>
      </View>

      <View style={{ flex:2.5, height: '50%'}}>
        <TouchableHighlight style={{ backgroundColor: '#35AFC8',  padding: 10
        }}
          onClick={() => { alert('You are following the brand now!');}}
        >
          <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold', fontFamily:'Helvetica', textAlign:'center'}}>Connect</Text>
        </TouchableHighlight>

      </View>

    </View>
  }

  renderSocialAccountList() {
    let accountList = [];
    const ACCOUNTS = [
      {

        accountType: 'Facebook',
        iconName: 'facebook',
        accountStatus: 'linked'
      } ,
      {
        accountType: 'Twitter',
        iconName: 'twitter',
        accountStatus: 'linked'
      },
      {
        accountType :'Instagram',
        iconName :'instagram',
        accountStatus : 'not linked'
      }
      ];
    ACCOUNTS.forEach((item) => {
      accountList.push(this.renderAccount(item));
    });
    return accountList;
  }

  renderLoginButton() {

      return (
        <View style={{flex:1, flexDirection: 'column', justifyContent:'center', alignItems: 'stretch'}}>
          <LoginButton
            readPermissions={["email"]}
            onLoginFinished={
              (error, result) => {
                if (error) {
                  alert("Login failed with error: " + error.message);
                } else if (result.isCancelled) {
                  alert("Login was cancelled");
                } else {
                  alert("Login was successful with permissions: " + result.grantedPermissions)
                }
              }
            }
            onLogoutFinished={() => alert("User logged out")}/>
        </View>
      );

  }


  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 1.5, flexDirection: 'row', justifyContent:'center', alignItems: 'center', paddingHorizontal: 20, backgroundColor: '#fff'}}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', fontFamily: 'Helvetica', textAlign:'center' }}>
            Connect Your Social Accounts
          </Text>
        </View>

        <View style={{flex:3, padding:10, marginVertical: 20}}>

          { this.renderSocialAccountList() }
        </View>


        {/*{this.renderLoginButton()}*/}
      </View>
    )
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
  }
})