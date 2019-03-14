import React, {Component} from 'react';
import { Button,} from "react-native-elements";
import PropTypes from 'prop-types';

class UnfollowButton extends Component {

  static propTypes = {
    buttonTitle : PropTypes.string.isRequired,
    onUnfollowClick: PropTypes.func

  };

  constructor(props, context) {
    super(props, context);
    this.onUnfollowClick = this.onUnfollowClick.bind(this);

  }

  onUnfollowClick() {
    if (this.props.onUnfollowClick) {
      this.props.onUnfollowClick();
    }
  }

  render() {

    return <Button
      backgroundColor={'#E6E7E8'}
      title={this.props.buttonTitle}
      onPress={this.onUnfollowClick}
      textStyle={{
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily:'Helvetica'
      }}
    />;

  }


}

export default UnfollowButton;