import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
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

    let backgroundColour = currentState === 'Follow'? '#fff' : '#35AFC8';
    let onClickFunction = currentState === 'Follow'? this.onFollowClick : this.onUnfollowClick;
    let title = currentState === 'Follow'? 'Follow':( this.props.unFollowEnable? 'Unfollow' : 'Following')
    let clickEnabled = currentState === 'Follow'? true :( this.props.unFollowEnable?  true : false)
    return <Button
      style={styles.buttonStyle}
      backgroundColor={backgroundColour}
      title={title}
      onPress={onClickFunction}
      textStyle={{
        color: '#666',
        fontSize: 12,
        textAlign: 'center',
        fontFamily:'Helvetica'
      }}
      disabled={!clickEnabled}
      />;

  }

}

const styles = StyleSheet.create({
  buttonStyle: { borderWidth: 2, borderColor: '#35AFC8' }
})

export default FollowButton;