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
  constructor(props, context) {
    super(props, context);
    this.renderItem = this.renderItem.bind(this);
    Navigation.events().bindComponent(this);
    this.menuItems = [
      {
        name: 'Find Worthy Brands',
        componentName: 'Explore'
      },
      {
        name: 'Current Points',
        componentName: 'Status'
      },
      {
        name: 'Manage Brands',
        componentName: 'Following'
      },
    ]
  }

  componentDidMount() {
    this.registerDrawerListener();
  }

  componentWillUnmount() {
    if (this.drawerOpenListener) {
      this.drawerOpenListener.remove();
    }

    if (this.drawerCloseListener) {
      this.drawerCloseListener.remove();
    }

    if (this.drawerButtonListener) {
      this.drawerButtonListener.remove();
    }
  }

  registerDrawerListener() {
    this.drawerOpenListener = Navigation.events().registerComponentDidAppearListener(
      ({ componentId, componentName }) => {
        if (componentId === "Drawer") {
          CommonUtils.setDrawerOpen(true);
        }
      });

    this.drawerCloseListener = Navigation.events().registerComponentDidDisappearListener(
      ({ componentId, componentName }) => {
        if (componentId === "Drawer") {
          CommonUtils.setDrawerOpen(false);
        }
      });

    this.drawerButtonListener = Navigation.events().registerNavigationButtonPressedListener(async ({ buttonId }) => {
      const isOpen = await CommonUtils.isDrawerOpen();
      if (buttonId === 'sideMenuHamburger') {
        Navigation.mergeOptions('Drawer', {
          sideMenu: {
            left: {
              visible: !isOpen,
            },
          },
        });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item, index) => `${index}`}
          data={ this.menuItems}
          renderItem={this.renderItem}
          style={{width:'100%', }}
        >
        </FlatList>
      </View>
    )
  }

  renderItem(item) {
    return (<ListItem
      style={{color: '#fff',}}
      title={<Text style={{fontFamily: "leaguespartan-bold", color: '#fff', fontSize: 20}}>{item.item.name}</Text>}
      titleStyle={{color: '#fff'}}
      titleNumberOfLines={1}
      onPress={() => this.handleClick(item.item)}
      hideChevron
      containerStyle={{
        borderBottomWidth: 0
      }}
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
    backgroundColor: '#000',
    width: '75%',
    paddingTop: 70,
    paddingLeft: 20,

  }
})