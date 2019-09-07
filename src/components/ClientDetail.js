import React, {Component} from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
import {Text, Button, SocialIcon} from "react-native-elements";
import {Navigation} from "react-native-navigation";
import PropTypes from 'prop-types';
import { Avatar, Icon } from 'react-native-elements';
import FollowButton from "./FollowButton";
import BelieverRequestController from "../controllers/BelieverRequestController";
import {CLOUDINARY_BASE_URL} from "../config";
import Mission from "./Mission";

class ClientDetail extends Component {

  static propTypes = {
    componentId: PropTypes.string.isRequired,
    clientId : PropTypes.number.isRequired,
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
          color: 'white',
        },
      },
    };
  }

  constructor(props, context) {
    super(props, context);
    Navigation.events().bindComponent(this);
    this.believerRequestController = new BelieverRequestController();
    // this.renderStatsContainer = this.renderStatsContainer.bind(this);
    this.state= {
      client: null,
      missions: []
    }

  }

  async componentDidMount() {
    try {
      let client = await this.believerRequestController.getClientDetails(this.props.clientId);
      this.setState({client: client});
      let missions =  await this.believerRequestController.getClientActiveMissions(this.props.clientId);
      this.setState({missions: missions});
    }
    catch(e) {
      throw e;
    }

  }

  renderStatsList() {
    if(this.state.client) {
      const client = this.state.client;
      return (
        <View>
          {this.renderSingleStat( 'City',  this.state.client.city)}
          {this.renderSingleStat( 'Address',  this.state.client.address1)}
        </View>
      );

    }
  }

  renderSingleStat(statParam, statValue) {
      return (
        <View style={{  margin:10, borderBottomWidth:1, borderColor:'#E6E7E8', flexDirection: 'row', flexGrow: 1}}>
          <View style={{ flex:2, padding:10, justifyContent:'flex-start', alignItems:'center', flexDirection: 'row' }}>
            <Text style={{ color: '#9c9d9e'}} >{statParam}</Text>
          </View>
          <View style={{ flex:4, padding:10, justifyContent:'flex-start', alignItems:'center', flexDirection: 'row' }}>
            <Text style={{ color: '#9c9d9e'}}>{statValue}</Text>
          </View>
        </View>
      );
  }

  renderMission(item) {
    return <Mission
      id={item.id}
      key={item.id}
      missionId={item.id}
      missionTitle={item.name}
      missionDescription={item.content}
      missionType={item.challenge_type}
      missionPoints={item.points}
      missionImage={CLOUDINARY_BASE_URL + item.image}
      clientLogo={CLOUDINARY_BASE_URL + item.client_logo}
      clientName={item.brand_name}
    />
  }

  renderMissionList() {
    let missionList = [];
    if(this.state.missions.length > 0) {
      this.state.missions.forEach((item) => {
        missionList.push(this.renderMission(item));
      });
      return missionList;
    }
    else{
      return <View style={styles.message}>
        <Text>
          No Active Missions for this Brand
        </Text>
      </View>
    }

  }

  render() {
    if (!this.state.client) {
      return null;
    }
    return (
      <View style={{height: '100%', flex:1}}>
      <ScrollView styles={{flex:1}}>
      <View style={styles.container}>
        <View style={{flex:3}}>
          <Image source={{uri: CLOUDINARY_BASE_URL + this.state.client.banner}}
                 style={{width:'100%', height: 200}} />
        </View>
        <View style={{flex:2.5, flexDirection: 'row', alignItems: 'center',}}>
          <View style={{flex: 3, height:'100%',backgroundColor: '#FFF', paddingLeft:10, paddingTop:30}}>
              <Avatar
                large
                rounded
                title="CR"
                activeOpacity={0.7}
                source={{
                  uri: CLOUDINARY_BASE_URL + this.state.client.logo,
                }}

              />
          </View>
          <View style={{flex: 7, paddingLeft: 10, height:'100%', justifyContent: 'center',paddingTop:30 }}>
            <Text style={{fontWeight: 'bold', fontSize: 14,  color: '#000', paddingBottom: 10}}>{this.state.client.name}</Text>
            <Text style={{fontWeight: 'normal', fontSize:12, lineHeight:16, color: '#333'}}>{this.state.client.description}</Text>

            <View style={{flex:1, flexDirection: 'row', marginTop: 15}}>
              <View style={{flex:1}}>
                <FollowButton unFollowEnable={false} initialState={"Follow"} clientId={this.state.client.id} />
              </View>

              <View style={{flex:1, width:'20%'}}>
                <Button
                  backgroundColor={'#35AFC8'}
                  title={'Map'}
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
        </View>
      </View>


      <View style={{paddingTop:30}}>

        <Text style={{fontWeight: 'bold', fontSize: 14, color:'#333', paddingBottom: 10, paddingTop: 10, textAlign:'center', borderBottom:2, borderColor:'#333', backgroundColor: '#ccc', }}>Active Missions</Text>

        <View style={styles.container}>
          { this.renderMissionList() }
        </View>

      </View>

      </ScrollView>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    fontFamily: 'Helvetica',
  }
});

export default ClientDetail;