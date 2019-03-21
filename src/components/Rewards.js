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
import RewardCard from "./RewardCard";
import BelieverRequestController from "../controllers/BelieverRequestController";

export default class Rewards extends React.Component {

  static propTypes = {
    componentId: PropTypes.string.isRequired,
  };

  static get options() {
    return {
      topBar: {
        title: {
          text: 'Rewards',
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
    this.onRewardClick = this.onRewardClick.bind(this);
    Navigation.events().bindComponent(this);
    this.state = {
      rewards : [],
      userPointBalance: null,
    }

  }

  async componentDidMount() {
    try {
      let rewards = await this.believerRequestController.getRewardsList();
      let userProfile = await this.believerRequestController.getUserProfile();
      this.setState({
        rewards,
        userPointBalance: parseInt(userProfile.point_balance)
      });
    }
    catch(e) {
      throw e;
    }
  }

  componentDidAppear() {
    CommonUtils.setCurrentActiveTab(this.props.componentId);

  }

  async onRewardClick(item) {
    try {
      let message = await this.believerRequestController.redeemReward(item.id);
      if(message.isRedeemed){
        alert(`Reward redeemed. New point balance : ${message.new_point_balance} `)
      }
      else{
        alert(`Could not redeem reward. Point balance : ${message.new_point_balance} `)
      }
      this.setState({userPointBalance: message.new_point_balance})
    }
    catch(e) {
      throw e;
    }
  }

  renderReward(item) {
    return <RewardCard
      id={item.id}
      key={item.id}
      rewardId={item.id}
      rewardTitle={item.title}
      rewardDescription={item.description}
      rewardType={item.type}
      rewardPoints={item.points}
      rewardImage={'https://picsum.photos/g/640/480/?random'}
      onRewardClick={() => this.onRewardClick(item)}
      userPointBalance={this.state.userPointBalance}

    />
  }



  renderRewardList() {
    let rewardList = [];
    this.state.rewards.forEach((item) => {
      rewardList.push(this.renderReward(item));
    });
    return rewardList;
  }



  render() {
    return (
      <ScrollView style={styles.container}>
        { this.renderRewardList() }
      </ScrollView>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})