import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';
import DrawerContainer from './DrawerContainer';


const Tab = createBottomTabNavigator();

function Home(params) {
  return(
    <>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>
          Welcome Home!
        </Text>
    </View>
    </>
  )
};

function Profile(params) {
  return(
    <>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>
          Profile!
        </Text>
    </View>
    </>
  )
};

function Settings(params) {
  return(
    <>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>
          Settings!
        </Text>
    </View>
    </>
  )
};


export default function BottomTabContainer({navigation}) {

  return(
    <Tab.Navigator initialRouteName='Car'>
      <Tab.Screen name='Home' component={Home} options={{headerShown: false, tabBarIcon: () => <Icon name="home-outline" size={25} /> }}/>
      <Tab.Screen name='Car' component={DrawerContainer} options={{headerShown: false, tabBarIcon: () => <Icon name="car-outline" size={25} /> }} />
      <Tab.Screen name='Profile' component={Profile} options={{headerShown: false, tabBarIcon: () => <IconSimple name="user" size={25} /> }}/>
      <Tab.Screen name='Setting' component={Settings} options={{headerShown: false, tabBarIcon: () => <Icon name="settings-outline" size={25} /> }}/>
    </Tab.Navigator>
  )
}
