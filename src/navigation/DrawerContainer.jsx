
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Entypo';

//drawer screens
import CarListScreenDrawer from '../screens/CarList';
import ActiveReservationScreenDrawer from '../screens/Reservations/ActiveReservation';
import CompleteReservationScreenDrawer from '../screens/Reservations/CompleteReservation';

const Drawer = createDrawerNavigator();

export default function DrawerContainer({navigation}) {
  return(
    <Drawer.Navigator initialRouteName='Cars'>
      <Drawer.Screen name='Cars' component={CarListScreenDrawer} options={{
        headerRight: () => <Icon name="add-to-list" style={{margin: 10}} size={25}  onPress={() => {
          navigation.navigate('AddCar');
        }} />
      }} />
      <Drawer.Screen name='CompleteReservation' component={CompleteReservationScreenDrawer} options={{title: "Complete Reservations"}}/>
      <Drawer.Screen name='ActiveReservation' component={ActiveReservationScreenDrawer} options={{title: "Active Reservations"}}/>
    </Drawer.Navigator>
  )
}