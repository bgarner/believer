import {Navigation} from 'react-native-navigation'

// Navigation.setDefaultOptions({
//   topBar: {
//     visible: true,
//     background: {
//       color: 'black',
//       translucent: true,
//       blur: false
//     }
//   },
// });
export const goToAuth = () => Navigation.setRoot({
  root: {
    component: {
      name: 'SignIn'
    },

  }
});

export const goSignup = () => Navigation.setRoot({
  root: {
    component: {
      name: 'SignUp'
    },
  }
})

export const goHome = () => Navigation.setRoot({
  root: {
    sideMenu: {
      id: "sideMenu",
      left: {
        component: {
          id: "Drawer",
          name: "SideMenu"
        }
      },
      center: {
        bottomTabs: {
          id: 'BottomTabsId',
          children: [
            {
              stack: {
                id: 'TabHome',
                children: [
                  {
                    component: {
                      name: 'Home',
                      options: {
                        bottomTab: {
                          fontSize: 12,
                          text: 'Home',
                          icon: require('../assets/home.png')
                        },
                        topBar: {
                          title: {
                            text: 'Home',
                          },
                        },
                      },
                    },

                  },
                ]
              }
            },
            {
              stack: {
                id: 'TabRewards',
                children: [
                  {
                    component: {
                      name: 'Rewards',
                      options: {
                        bottomTab: {
                          fontSize: 12,
                          text: 'Rewards',
                          icon: require('../assets/rewards.png')
                        },
                        // topBar: {
                        //   visible: true
                        // },
                      },
                    },

                  },
                ]
              }
            },
            {
              stack: {
                id: 'TabPost',
                children: [
                  {
                    component: {
                      name: 'MessageList',
                      options: {
                        bottomTab: {
                          fontSize: 12,
                          text: 'Inbox',
                          icon: require('../assets/post.png')

                        },
                        // topBar: {
                        //   visible: true
                        // },
                      },
                    },

                  },
                ]
              }
            },
            {
              stack: {
                id: 'TabRefer',
                children: [
                  {
                    component: {
                      name: 'Refer',
                      options: {
                        bottomTab: {
                          fontSize: 12,
                          text: 'Refer',
                          icon: require('../assets/refer.png')

                        },
                        // topBar: {
                        //   visible: true
                        // },
                      },
                    },

                  },
                ]
              }
            },
            {
              stack: {
                id: 'TabAccount',
                children: [
                  {
                    component: {
                      name: 'Account',
                      options: {
                        bottomTab: {
                          fontSize: 12,
                          text: 'Account',
                          icon: require('../assets/account.png')

                        },
                        // topBar: {
                        //   visible: true
                        // },
                      },
                    },

                  },
                ]
              }
            },

          ]
        }

      }
    }
  }
})