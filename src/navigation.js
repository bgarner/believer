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
    bottomTabs: {
      id: 'BottomTabsId',
      children: [
        {
          component: {
            name: 'Home',
            options: {
              bottomTab: {
                fontSize: 12,
                text: 'Home',
                // icon: require('../signin.png')
              }
            }
          },
        },
        {
          component: {
            name: 'Rewards',
            options: {
              bottomTab: {
                text: 'Rewards',
                fontSize: 12,
                // icon: require('./signup.png')
              }
            }
          },
        },
        {
          component: {
            name: 'Refer',
            options: {
              bottomTab: {
                text: 'Refer',
                fontSize: 12,
                // icon: require('./signup.png')
              }
            }
          },
        },
        {
          component: {
            name: 'Account',
            options: {
              bottomTab: {
                text: 'Account',
                fontSize: 12,
                // icon: require('./signup.png')
              }
            }
          },
        },
      ],
    },
    stack: {
      id: 'App',
      children: [
        {
          component: {
            name: 'Home',
          }
        }
      ],
    },
    sideMenu: {
      id: "sideMenu",
      left: {
        component: {
          id: "Drawer",
          name: "SideMenu"
        }
      },
      center: {
        stack: {
          id: "AppRoot",
          children: [{
            component: {
              id: "App",
              name: "Home"
            }
          }]
        }
      }
    }

  }
})