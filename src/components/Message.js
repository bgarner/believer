import React, {Component} from 'react';
import { View, StyleSheet, } from 'react-native';
// import {Navigation} from "react-native-navigation";
import PropTypes from 'prop-types';
import { SwipeListView } from 'react-native-swipe-list-view';

class Message extends Component {
  static propTypes = {
    messageId : PropTypes.number.isRequired,
    messageTitle : PropTypes.string.isRequired,
    messageDescription : PropTypes.string.isRequired,
    onMissionClick : PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.onMessageClick = this.onMessageClick.bind(this);
  }

  onMessageClick() {
    if (this.props.onMessageClick) {
      this.props.onMessageClick();
    }
  }

  render() {
    return (
      <SwipeListView
        useFlatList
        data={this.state.listViewData}
        renderItem={ (data, rowMap) => (
          <View style={styles.rowFront}>
            <Text>I am {data.item} in a SwipeListView</Text>
          </View>
        )}
        renderHiddenItem={ (data, rowMap) => (
          <View style={styles.rowBack}>
            <Text>Left</Text>
            <Text>Right</Text>
          </View>
        )}
        leftOpenValue={75}
        rightOpenValue={-75}
      />
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    fontFamily: 'Helvetica',
    height: 400
  },

});

export default Message;