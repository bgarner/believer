import { Navigation } from 'react-native-navigation'

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
                          // icon: require('../signin.png')
                        },
                        topBar: {
                          visible: true
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
                          // icon: require('../signin.png')
                        },
                        topBar: {
                          visible: true
                        },
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
                      name: 'Post',
                      options: {
                        bottomTab: {
                          fontSize: 12,
                          text: 'Post',
                          // icon: require('../signin.png')
                        },
                        topBar: {
                          visible: true
                        },
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
                          // icon: require('../signin.png')
                        },
                        topBar: {
                          visible: true
                        },
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
                          // icon: require('../signin.png')
                        },
                        topBar: {
                          visible: true
                        },
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