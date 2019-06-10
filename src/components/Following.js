import React from 'react'
import {
  View,
  StyleSheet, ScrollView, Text,
} from 'react-native'
import {Button} from 'react-native-elements'
import {Navigation} from 'react-native-navigation';
import BelieverRequestController from "../controllers/BelieverRequestController";
import ClientCard from "./ClientCard";
import CommonUtils from "../CommonUtils";
import {CLOUDINARY_BASE_URL} from "../config.js";

export default class Following extends React.Component {
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Manage Brands'
        },
      }
    };
  }


  constructor(props, context) {
    super(props, context);
    this.believerRequestController = new BelieverRequestController();
    // this.onMissionClick = this.onMissionClick.bind(this);
    this.onClientCardClick = this.onClientCardClick.bind(this);
    Navigation.events().bindComponent(this);
    this.state = {
      clients : []
    }
  }

  async componentDidMount() {
    try {
      let clients = await this.believerRequestController.getClientsFollowedByUser();
      this.setState({clients: clients});
    }
    catch(e) {
      throw e;
    }

  }


  async onClientCardClick(item) {


    let currentActiveTab = await CommonUtils.getCurrentActiveTab();
    console.log(currentActiveTab)
    Navigation.push(currentActiveTab, {
      component: {
        name: 'ClientDetail',
        passProps: {
          clientId: item.id,
          clientName: item.name,
          clientDescription: item.description,
          clientImage: CLOUDINARY_BASE_URL + item.banner,
          clientLogo: CLOUDINARY_BASE_URL + item.logo,
        },
        options: {
          topBar: {
            visible: true,
            title: {
              text: item.name
            }
          }
        }

      }
    });
  }

  renderClient(item) {

    return <ClientCard
      id={item.id}
      key={item.id}
      clientId={item.id}
      clientName={item.name}
      clientDescription={item.content}
      clientImage={CLOUDINARY_BASE_URL + item.banner}
      clientLogo={CLOUDINARY_BASE_URL + item.logo}
      onClientCardClick={() => this.onClientCardClick(item)}
    />
  }

  renderClientList() {
    let clientList = [];
    if(this.state.clients.length >= 1) {
      this.state.clients.forEach((item) => {
        clientList.push(this.renderClient(item));
      });
      return clientList;
    }
    else{
      return <View>
        <Text>
          No brands to follow!
        </Text>
      </View>
    }

  }

  render() {
    return (
      <View style={{flex:1, flexDirection:'column'}}>
        <View style={{flex:12}}>
          <ScrollView>
            <View style={styles.container}>
              { this.renderClientList() }
            </View>
          </ScrollView>
        </View>

        <View style={{flex:1, flexDirection: 'row', width:'100%', justifyContent: 'center', alignItems:'flex-end'}}>
          <Button
          backgroundColor={'#35AFC8'}
          title={'Find Worthy Brands'}
          textStyle={{
          fontSize: 14,
          fontWeight: 'bold',
          textAlign: 'center',
          fontFamily:'Helvetica'
          }}
          onPress={() => { alert('You are following the brand now!');}}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, width:'100%', height: '100%', flexWrap: 'wrap', flexDirection:'row' }
})