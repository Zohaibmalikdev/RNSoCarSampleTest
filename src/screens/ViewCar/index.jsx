import { View, Text, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import IconM from 'react-native-vector-icons/MaterialIcons';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { lineSeperator } from '../../services/lineSeperator';
import styles from './style';

export default function ViewReserveCarScreen({ route, navigation }) {
  const { params } = route;
  const { item } = params;
  if (item === undefined) { navigation.goBack(); }
  const { name, location, price, currency, description, user,
          reserved_for_days, reserved_start_time, reserved_end_time, total, is_reserved } = item;
  const {userName, userPhoneNumber} = user;

  const ds = new Date(reserved_start_time);
  const de = new Date(reserved_end_time);

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={[{ justifyContent: 'center', alignItems: 'center' }, styles.card, styles.shadowProp]}>
              <Image source={require('../../assets/images/car.png')} style={{ width: 250, height: 125, resizeMode: 'center' }} />

            </View>

            <View style={[styles.card, styles.shadowProp]}>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>{name}</Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'red', marginTop: 10 }}>{currency} {price} / per day</Text>
              </View>

              {lineSeperator}

              <View style={{ flexDirection: 'row', marginVertical: 15 }}>
                <Text style={{ fontSize: 16, marginTop: 10 }}>Reserved for: </Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'red', marginTop: 10 }}>{reserved_for_days} days</Text>
              </View>

              {lineSeperator}

              <View style={{ flexDirection: 'row', marginVertical: 15 }}>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <Icon name="pricetag-outline" size={18} />
                  <Text style={{ fontSize: 16, marginLeft: 5 }}>Total: </Text>
                </View>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'red', marginTop: 10 }}>{currency} {total}</Text>
              </View>

              {lineSeperator}

              <View style={{ flexDirection: 'column', marginBottom: 15 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 16, marginTop: 10, fontStyle: 'italic' }}>Start Time: </Text>
                  <Text style={{ fontSize: 16, marginTop: 10, fontStyle: 'italic' }}>End Time: </Text>
                </View>


                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                  <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Icon name="time-outline" size={18} />
                    <Text style={{ fontSize: 16, fontWeight: '500', paddingHorizontal: 10 }}>
                      {`${ds.getHours()}:${ds.getMinutes()}`}
                    </Text>
                  </View>

                  <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: '500', paddingHorizontal: 10 }}>
                      {`${de.getHours()}:${de.getMinutes()}`}
                    </Text>
                    <Icon name="ios-time" size={18} />
                  </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Icon name="calendar-outline" size={18} />
                    <Text style={{ fontSize: 16, fontWeight: '500', paddingHorizontal: 10 }}>
                      {`${ds.getDate()}/${ds.getMonth() + 1}/${ds.getFullYear()}`}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: '500', paddingHorizontal: 10 }}>
                      {`${de.getDate()}/${de.getMonth() + 1}/${de.getFullYear()}`}
                    </Text>
                    <Icon name="calendar" size={18} />
                  </View>
                </View>

              </View>

              {lineSeperator}


              <View style={{ flexDirection: 'column', marginBottom: 15 }}>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <Icon name="ios-location-outline" size={18} />
                  <Text style={{ fontSize: 16, marginLeft: 5 }}>Parked Location: </Text>
                </View>

                <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>{location}</Text>
              </View>

              {lineSeperator}

              <View style={{ flexDirection: 'column', marginBottom: 15 }}>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>

                  <IconM name="description" size={18} />
                  <Text style={{ fontSize: 16, marginLeft: 5 }}>Description: </Text>
                </View>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>{description} </Text>
              </View>

              {lineSeperator}

              <View style={{ flexDirection: 'column', marginBottom: 15 }}>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>

                  <IconM name="verified-user" size={18} />
                  <Text style={{ fontSize: 16, marginLeft: 5 }}>Reserved User Details: </Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <View style={{flexDirection: 'row', marginTop: 10,  }}>
                    <IconAnt name="user" size={18} />
                    <Text style={{ fontSize: 16, fontWeight: 'bold',marginLeft: 5 }}>{userName} </Text>
                  </View>
                  
                  <View style={{flexDirection: 'row', marginTop: 10,  }}>
                  <Icon name="ios-phone-portrait-outline" size={18} />
                    <Text style={{ fontSize: 16, fontWeight: 'bold',marginLeft: 5 }}>{userPhoneNumber} </Text>
                  </View>
                </View>
              </View>
              {lineSeperator}


            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', marginVertical: 20 }}>
              <TouchableOpacity style={[styles.button, styles.shadowProp]} onPress={() => navigation.goBack()}>
                <Text>Back</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )

};