import React, {Component} from 'react';
import {Text, Button,} from "react-native-elements";
import PropTypes from 'prop-types';

class FollowButton extends Component {

  static propTypes = {
    buttonTitle : PropTypes.string.isRequired,
    onFollowClick: PropTypes.func

  };

  constructor(props, context) {
    super(props, context);
    this.onFollowClick = this.onFollowClick.bind(this);

  }

  onFollowClick() {
    if (this.props.onFollowClick) {
      this.props.onFollowClick();
    }
  }

  render() {

    return <Button
      backgroundColor={'#35AFC8'}
      title={this.props.buttonTitle}
      onPress={this.onFollowClick}
      textStyle={{
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily:'Helvetica'
      }}
      />;

  }


}

export default FollowButton;