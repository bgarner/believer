import React, {Component} from 'react';
import {StyleSheet, Dimensions, Image, View, ListView, TouchableHighlight, TouchableOpacity, Animated} from 'react-native';
import {Navigation} from 'react-native-navigation';
import PropTypes from 'prop-types';
import BelieverRequestController from "../controllers/BelieverRequestController";
import CommonUtils from "../CommonUtils";
import {SwipeListView} from "react-native-swipe-list-view";
import {Avatar, Text} from "react-native-elements";
import Icon from 'react-native-vector-icons/dist/FontAwesome5';

class MessageList extends Component {
  static propTypes = {
    componentId: PropTypes.string.isRequired,
  };

  static get options() {
    return {
      topBar: {
        title: {
          text: 'Inbox',
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
    this.onMessageClick = this.onMessageClick.bind(this);
    Navigation.events().bindComponent(this);

    this.state = {
      messages: [],
    };
    this.rowSwipeAnimatedValues = {};

  }

  async componentDidAppear() {

    CommonUtils.setCurrentActiveTab(this.props.componentId);
    try {
      let messages = await this.believerRequestController.getMessages();
      messages.forEach((item) => {
        this.rowSwipeAnimatedValues[`${item.id}`] = new Animated.Value(0);
      });
      this.setState({
        messages: messages.map((item) => Object.assign({}, item, {key: `${item.id}`})  ),
      } );
    }
    catch(e) {
      throw e;
    }

  }


  onMessageClick(item) {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'Message',
        passProps: {
          messageId: item.message_id,
        },
        options: {
          topBar: {
            title: {
              text: 'Inbox'
            }
          }
        }

      }
    });
  }

  closeRow(rowMap, rowKey) {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  }

  deleteRow(rowMap, rowKey) {
    this.closeRow(rowMap, rowKey);
    const newData = [...this.state.messages];
    const prevIndex = this.state.messages.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    this.setState({messages: newData});
  }

  onRowDidOpen = (rowKey, rowMap) => {
    console.log('This row opened', rowKey);
  }

  onSwipeValueChange = (swipeData) => {
    const { key, value } = swipeData;
    this.rowSwipeAnimatedValues[key].setValue(Math.abs(value));
  }


  render() {
    if (Object.getOwnPropertyNames(this.rowSwipeAnimatedValues).length < 1) {
      return null;
    }
    return (
      <View style={styles.container}>
        <SwipeListView
          useFlatList
          data={this.state.messages}
          recalculateHiddenLayout
          renderItem={ (data, rowMap) => (
            <TouchableHighlight
              onPress={ () => this.onMessageClick(data.item) }
              style={styles.rowFront}
              underlayColor={'#AAA'}
            >
            <View style={{flex:1, flexDirection:'row'}}>
              <View style={{flex:1, alignItems:'center', justifyContent:'center', paddingLeft:20}}>
                <Avatar
                  medium
                  title="CR"
                  onPress={() => console.log("Works!")}
                  activeOpacity={0.7}
                  source={{
                    uri: 'https://picsum.photos/75/75/?random',
                  }}
                />
              </View>
              <View style={{flex:5, paddingTop:15, paddingLeft:15}}>
                <Text style={{color:'#231F20', fontSize:14, fontFamily:'Helvetica', fontWeight:'bold'}}>{data.item.client.name}</Text>
                <Text style={{color:'#9c9d9e', marginTop: 5 }}>{data.item.subject}</Text>
              </View>
              <View style={{ flex:1.5, alignItems:'flex-end', paddingRight:15}}>
                <Text style={{color:'#9c9d9e', marginTop: 10, fontSize:10 }}>{data.item.prettyCreatedAt}</Text>
              </View>
            </View>
            </TouchableHighlight>
          )}
          renderHiddenItem={ (data, rowMap) => (
            <View style={styles.rowBack}>
              <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={ _ => this.closeRow(rowMap, data.item.key) }>
                <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
                  <Icon name='envelope-open-text' size={25} color='#fff' />
                  <Text style={{ color: '#fff', fontSize: 10, lineHeight:10, paddingTop:5, fontWeight:'bold', textAlign:'center' }}>Mark as Unread</Text>
                </View>

              </TouchableOpacity>
              <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={ _ => this.deleteRow(rowMap, data.item.key) }>

                <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
                  <Icon name='trash-alt' size={25} color="#fff" />
                  <Text style={{ color: '#fff', fontSize: 10, lineHeight:10, paddingTop:5, fontWeight:'bold', textAlign:'center' }}>Delete</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          // leftOpenValue={75}
          rightOpenValue={-150}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onRowDidOpen={this.onRowDidOpen}
          onSwipeValueChange={this.onSwipeValueChange}
        />

      </View>
    )
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:10
  },
  backTextWhite: {
    color: '#FFF'
  },
  rowFront: {
    // alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#e6e7e8',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 75,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: '#35AFC8',
    right: 75
  },
  backRightBtnRight: {
    backgroundColor: '#CF3338',
    right: 0,
  },
  controls: {
    alignItems: 'center',
    marginBottom: 30
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5
  },
  switch: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 10,
    width: Dimensions.get('window').width / 4,
  },
  icon: {
    // height: 25,
    // width: 25,
    color: '#fff'
  }

});

export default MessageList;