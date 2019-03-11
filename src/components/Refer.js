import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet, ScrollView,
} from 'react-native'
import {Navigation} from 'react-native-navigation';
import PropTypes from "prop-types";
import CommonUtils from "../CommonUtils";
import BelieverRequestController from "../controllers/BelieverRequestController";
import ReferCard from "./ReferCard";

export default class Refer extends React.Component {
  static propTypes = {
    componentId: PropTypes.string.isRequired,
  };
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Refer',
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
    this.believerRequestController = new BelieverRequestController();
    // this.httpRequestController = HttpRequestController.getInstance();
    this.onReferClick = this.onReferClick.bind(this);
    Navigation.events().bindComponent(this);
    this.state = {
      clients : []
    }

  }

  async componentDidMount() {
    try {
      let clients = await this.believerRequestController.getClientsFollowedByUser();
      this.setState({clients});
    }
    catch(e) {
      throw e;
    }
  }

  onReferClick(item) {

  }
  renderClient(item) {

    return <ReferCard
      id={item.id}
      key={item.id}
      clientId={item.id}
      clientName={item.name}
      clientDescription={item.content}
      clientImage={'https://picsum.photos/g/640/480/?random'}
      clientLogo={'https://picsum.photos/75/75/?random'}
      onReferClick={() => this.onReferClick(item)}
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
      <View style={styles.container}>
          <ScrollView>
            <View style={styles.container}>
              { this.renderClientList() }
            </View>
          </ScrollView>
      </View>
    )
  }

  componentDidAppear() {
    console.log('Refer');
    console.log(this.props.componentId);
    CommonUtils.setCurrentActiveTab(this.props.componentId);

  }
}

const styles = StyleSheet.create({
  container: { flex: 1, width:'100%', height: '100%' }
})