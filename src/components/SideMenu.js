import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList
} from 'react-native'
import {Navigation} from 'react-native-navigation';
import {Avatar, ListItem} from "react-native-elements";
import CommonUtils from "../CommonUtils";

export default class SideMenu extends React.Component {
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Side Menu'
        },
      }
    };
  }


  constructor(props, context) {
    super(props, context);
    this.renderItem = this.renderItem.bind(this);
    this.menuItems = [
      {
        name: 'Explore',
        componentName: 'Explore'
      },
      {
        name: 'Following',
        componentName: 'Following'
      },
      {
        name: 'Status',
        componentName: 'Status'
      },
      {
        name: 'Settings',
        componentName: 'Settings'
      }
    ]
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item, index) => `${index}`}
          data={ this.menuItems}
          renderItem={this.renderItem}
          style={{width:'100%'}}
        >
        </FlatList>
      </View>
    )
  }

  renderItem(item) {
    return (<ListItem style={{color: '#fff'}}
      title={item.item.name}
      titleStyle={{color: '#fff'}}
      titleNumberOfLines={1}
      onPress={() => this.handleClick(item.item)}

    />);
  }

  async handleClick(item) {
    try {
      const currentActiveTab = await CommonUtils.getCurrentActiveTab();
      Navigation.push(currentActiveTab, {
        component: {
          name: item.componentName,
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
      Navigation.mergeOptions(this.props.componentId, {
        sideMenu: {
          left: {
            visible: false
          }
        }
      });
    }
    catch(e){
      throw e;
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#231F20',
    width: '75%'
  }
})