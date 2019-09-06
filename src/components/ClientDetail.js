import React, {Component} from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
import {Text, Button, SocialIcon} from "react-native-elements";
import {Navigation} from "react-native-navigation";
import PropTypes from 'prop-types';
import { Avatar, Icon } from 'react-native-elements';
import FollowButton from "./FollowButton";
import BelieverRequestController from "../controllers/BelieverRequestController";
import {CLOUDINARY_BASE_URL} from "../config";

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
      client: null
    }

  }

  async componentDidMount() {
    try {
      let client = await this.believerRequestController.getClientDetails(this.props.clientId);
      this.setState({client: client});
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

  renderLeaderboard() {

    const leaderboardData = this.state.client.stats.leaderboard;
    Object.getOwnPropertyNames(leaderboardData).forEach( (item, index) => {
      result.push(
        <View key={`${index}`} style={{  marginHorizontal:10,  flexDirection: 'row', flexGrow: 1}}>
          <View style={{ flex:1, padding:10, justifyContent:'flex-start', alignItems:'center', flexDirection: 'row' }}>

          </View>
          <View style={{ flex:1, padding:10, borderLeftWidth:1, borderColor:'#E6E7E8', justifyContent:'flex-start', alignItems:'center', flexDirection: 'row' }}>

          </View>
        </View>)
    })
    return result;
  }
  renderLeaderboardHeader() {
    return <View key='header' style={{  marginHorizontal:10,   flexGrow: 1}}>
      <Text style={{marginTop:10, color: '#9c9d9e'}}>Leaderboards</Text>
      <View style={{flexDirection: 'row', marginTop:20}}>
        <View style={{ flex:1, padding:10, justifyContent:'center', alignItems:'center', flexDirection: 'row' }}>
          <Text style={{color: '#35AFC8'}}>Highest Points</Text>
        </View>
        <View style={{ flex:1, padding:10, justifyContent:'center', alignItems:'center', flexDirection: 'row' }}>
          <Text style={{color: '#35AFC8'}}>Growing Influencers</Text>
        </View>
      </View>
    </View>
  }

  renderLeaderboardProfile(name, point_balance) {
    return (
      <View style={{flex:1.75, flexDirection: 'row', alignItems: 'center', marginHorizontal:0}}>
      <View style={{flex: 3.5, height:'100%',backgroundColor: '#FFF', }}>
        <Avatar
          medium
          rounded
          title="CR"
          activeOpacity={0.7}
          source={{
            uri: 'http://lorempixel.com/100/100/people/',
          }}

        />
      </View>
      <View style={{flex: 5, paddingLeft: 10, height:'100%', justifyContent: 'flex-start',   }}>
        <Text style={{ fontSize: 14,  color: '#000'}}>{name}</Text>
        <Text style={{ fontSize: 10,  color: '#9c9d9e', paddingTop:3}}>{point_balance} total points</Text>
      </View>
    </View>
    );
  }

  render() {
    if (!this.state.client) {
      return null;
    }
    return (
      <View style={{height: '100%', flex:1}}>
      <ScrollView styles={{flex:1}}>
      <View style={styles.container}>
        <View style={{flex:2.5}}>
          <Image source={{uri: CLOUDINARY_BASE_URL + this.state.client.banner}}
                 style={{width:'100%', height: 150}} />
        </View>
        <View style={{flex:2.5, flexDirection: 'row', alignItems: 'center',}}>
          <View style={{flex: 3, height:'100%',backgroundColor: '#FFF', paddingLeft:20, paddingTop:15}}>
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
          <View style={{flex: 7, paddingLeft: 10, height:'100%', justifyContent: 'center', }}>
            <Text style={{fontWeight: 'bold', fontSize: 14,  color: '#000'}}>{this.state.client.name}</Text>
          </View>
        </View>
        <View style={{flex:1, flexDirection: 'row', marginTop: 15}}>
          <View style={{flex:1}}>
            <FollowButton unFollowEnable={false} initialState={"Follow"} clientId={this.state.client.id}/>
          </View>

          <View style={{flex:1}}>
          <Button
            backgroundColor={'#35AFC8'}
            title={'Share This'}
            onPress={() => { alert('You are sharing the brand now!');}}
            textStyle={{
              fontSize: 14,
              fontWeight: 'bold',
              textAlign: 'center',
              fontFamily:'Helvetica'
            }}
          />
          </View>


        </View>
        <View style={{
          flex:2,
          alignItems: 'center',
          margin: 20,
          textAlign: 'center',
          fontFamily: 'Helvetica',
          borderBottomWidth:0.25,
          borderColor: '#9c9d9e'
        }}>
          <View style={{flex:1}}>
          <Text>{this.state.client.description}</Text>
          </View>
        </View>

        <View style={{flex:8}}>
          {this.renderStatsList()}
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