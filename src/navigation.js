import {Navigation} from 'react-native-navigation'

// Navigation.setDefaultOptions({
//   topBar: {
//     visible: true,
//     background: {
//       color: 'white',
//       translucent: false,
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
});

export const goHome = () => Navigation.setRoot({
  root: {
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
                      // scale: 10,
                      text: 'Missions',
                      icon: require('../assets/home.png'),
                      // iconInsets: { top: 0, left: 0, bottom: 0, right: 0 },
                    }
                  },
                },

              },
            ]
          }
        },
        {
          stack: {
            id: 'TabSearch',
            children: [
              {
                component: {
                  name: 'Explore',
                  options: {
                    bottomTab: {
                      fontSize: 12,
                      text: 'Search',
                      icon: require('../assets/search.png')

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
                      icon: require('../assets/inbox.png')

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
                  name: 'Status',
                  options: {
                    bottomTab: {
                      fontSize: 12,
                      text: 'Profile',
                      icon: require('../assets/account.png')

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
})