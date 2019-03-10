import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet, ScrollView,
} from 'react-native'
import {Navigation} from 'react-native-navigation';
import BelieverRequestController from "../controllers/BelieverRequestController";
import ClientCard from "./ClientCard";

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

  renderClient(item) {

    return <ClientCard
      id={item.id}
      key={item.id}
      clientId={item.id}
      clientName={item.name}
      clientDescription={item.content}
      clientImage={'https://picsum.photos/g/640/480/?random'}
      clientLogo={'https://picsum.photos/75/75/?random'}
      onClientClick={() => this.onClientClick(item)}
    />
  }

  renderClientList() {
    let clientList = [];
    this.state.clients.forEach((item) => {
      clientList.push(this.renderClient(item));
    });
    return clientList;
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        { this.renderClientList() }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, width:'100%', flexWrap: 'wrap', flexDirection:'row', /*justifyContent:'center'*/ }
})