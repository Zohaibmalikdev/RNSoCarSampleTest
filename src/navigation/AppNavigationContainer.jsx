import { Text, View, SafeAreaView } from 'react-native'
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Entypo';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

//stack
import AddCarScreen from '../screens/AddCar';
import ViewReserveCarScreen from '../screens/ViewCar';
import ReserveCarScreen from '../screens/ReserveCar';
import BottomTabContainer from './BottomTabContainer';

//================== Navigator
const Stack = createNativeStackNavigator();
//================== Navigator


class AppNavigationContainer extends Component {
  constructor(props){
    super(props);
    this.state = {};

    this.StackScreens = this.StackScreens.bind(this);
  }


  StackScreens(params) {
    return(
      <>
      <Stack.Navigator 
            initialRouteName='Home'>
            <Stack.Screen 
              name='Home' 
              component={BottomTabContainer} 
              options={{ 
                title: "My Home", 
                headerShown: false,
              }} 
            />

            <Stack.Screen 
              name='AddCar' 
              component={AddCarScreen} 
              options={{ 
                title: "Add Car", 
              }} 
            />

            <Stack.Screen 
              name='ReserveCar' 
              component={ReserveCarScreen} 
              options={{ 
                title: "Reserve Car", 
              }} 
            />  

            <Stack.Screen 
              name='ViewReserveCar' 
              component={ViewReserveCarScreen}
              options={{ 
                title: "View Reserved Car", 
              }}  />
      </Stack.Navigator>
      </>
    )
  }

  render() {
    return (
        this.StackScreens()
    )
  }
}


export default AppNavigationContainer;