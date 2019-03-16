import React, {Component} from 'react';
import {Text, Button,} from "react-native-elements";
import PropTypes from 'prop-types';
import BelieverRequestController from "../controllers/BelieverRequestController";

class FollowButton extends Component {

  static propTypes = {
    unFollowEnable: PropTypes.bool.isRequired,
    initialState: PropTypes.oneOf(['Follow', 'Unfollow']).isRequired,
    clientId: PropTypes.number.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.onFollowClick = this.onFollowClick.bind(this);
    this.onUnfollowClick= this.onUnfollowClick.bind(this);
    this.believerRequestController = new BelieverRequestController();
    this.state = {
      subsequentState: null,
    }
  }

  async onFollowClick() {
    const clientId = this.props.clientId;
    try {
      let requestFollow = await this.believerRequestController.followClient(clientId);
      if(requestFollow) {
        if(requestFollow.isFollowing) {
          this.setState({subsequentState: 'Unfollow'});
        }
      }

    }
    catch(e) {
      throw e;
    }
  }

  async onUnfollowClick() {
    const clientId = this.props.clientId;
    try {
      let requestUnfollow = await this.believerRequestController.unfollowClient(clientId);
      if(requestUnfollow) {
        if(!requestUnfollow.isFollowing) {
          this.setState({subsequentState: 'Follow'});
        }
      }

    }
    catch(e) {
      throw e;
    }
  }

  render() {
    const currentState = this.state.subsequentState === null? this.props.initialState: this.state.subsequentState;

    let backgroundColour = currentState === 'Follow'? '#35AFC8' : '#E6E7E8';
    let onClickFunction = currentState === 'Follow'? this.onFollowClick : this.onUnfollowClick;
    let title = currentState === 'Follow'? 'Follow':( this.props.unFollowEnable? 'Unfollow' : 'Followed')
    let clickEnabled = currentState === 'Follow'? true :( this.props.unFollowEnable?  true : false)
    return <Button
      backgroundColor={backgroundColour}
      title={title}
      onPress={onClickFunction}
      textStyle={{
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily:'Helvetica'
      }}
      disabled={!clickEnabled}
      />;

  }


}

export default FollowButton;