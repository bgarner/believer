import React from 'react'
import {
  View, StyleSheet, ScrollView,
} from 'react-native'
import {Navigation} from 'react-native-navigation';
import BelieverRequestController from "../controllers/BelieverRequestController";
import Client from "./Client";
import PropTypes from "prop-types";
import CommonUtils from "../CommonUtils";
import {CLOUDINARY_BASE_URL} from "../config";

export default class Explore extends React.Component {
  static propTypes = {
    componentId: PropTypes.string.isRequired,
  };
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Brands'
        },
      }
    };
  }

  constructor(props, context) {
    super(props, context);
    this.believerRequestController = new BelieverRequestController();
    this.onClientClick = this.onClientClick.bind(this);
    Navigation.events().bindComponent(this);
    this.state = {
      clients : []
    }
  }

  async componentDidMount() {
    try {
      let clients = await this.believerRequestController.getClientsNearUser();
      this.setState({clients: clients});
    }
    catch(e) {
      throw e;
    }

  }

  async onClientClick(item) {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'ClientDetail',
        passProps: {
          clientId: item.id,
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

    return <Client
      id={item.id}
      key={item.id}
      clientId={item.id}
      clientName={item.name}
      clientDescription={item.content}
      clientImage={CLOUDINARY_BASE_URL + item.banner}
      clientLogo={CLOUDINARY_BASE_URL + item.logo}
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
      <ScrollView contentContainerStyle={{ justifyContent: 'flex-start', flex: 1, flexDirection: 'row', flexWrap: 'wrap', }}>
        { this.renderClientList() }
      </ScrollView>
    )
  }
}

// const styles = StyleSheet.create({
//   container: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', }
// })