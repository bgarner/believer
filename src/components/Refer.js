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
import {CLOUDINARY_BASE_URL} from "../config";

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
    Navigation.push(this.props.componentId, {
      component: {
        name: 'ReferForm',
        passProps: {
          clientId: item.id,
          clientName: item.name,
          clientDescription: item.description,
          clientImage: CLOUDINARY_BASE_URL + item.banner,
          viewTitle: `Refer a Friend to ${item.name}`,

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

    return <ReferCard
      id={item.id}
      key={item.id}
      clientId={item.id}
      clientName={item.name}
      clientDescription={item.description}
      clientImage={CLOUDINARY_BASE_URL + item.banner}
      clientLogo={CLOUDINARY_BASE_URL + item.logo2}
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