

import { View } from 'react-native'
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import AppNavigationContainer from './navigation/AppNavigationContainer';


export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavigationContainer>
         <AppNavigationContainer />
        </NavigationContainer>
      </View>
    )
  }
};