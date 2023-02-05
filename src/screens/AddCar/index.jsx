import { View, Text, TouchableOpacity, ScrollView, Image, Alert, TextInput, KeyboardAvoidingView } from 'react-native';
import React from 'react';
import { firebase } from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/Ionicons';
import IconM from 'react-native-vector-icons/MaterialIcons';
import { firebaseConfig } from '../../config/firebaseConfig';
import { carData } from '../../services/data/carsData';
import { lineSeperator } from '../../services/lineSeperator';
import styles from './style';

const __db__ = firebase.app().database(firebaseConfig.databaseURL);

export default function AddCarScreen({ route, navigation }) {
  function writeFirebaseData(data, cb) {
    const newRef = __db__.ref(`/cars/`).push();  //create auto generated key.

    data.id = newRef.key;  //new id 
    //prepare data to send to firebase. 
    data = carData.prepare_data(data);

    //set new data
    newRef.set(data).then(() => {
      if (cb) {
        cb();
      }
      console.log('-----------------');
      console.log('--------Data UPdated------');
      console.log('-----------------');
      Alert.alert('Added Successfully');
    })
  }

  const __textStyle = {
    width: '100%', height: 35,
    marginVertical: 8
  }
  const [name, setName] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [price, setPrice] = React.useState(0);

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
              <View style={{ flexDirection: 'row' }}>
                <View style={{ margin: 15 }}>
                  <Icon name="car-outline" size={18} />
                </View>
                <TextInput style={__textStyle} placeholder='Car Name' value={name} onChangeText={setName} maxLength={22} />
              </View>
              {lineSeperator}
              <View style={{ flexDirection: 'row' }}>
                <View style={{ margin: 15 }}>
                  <Icon name="ios-location-outline" size={18} />
                </View>
                <TextInput style={__textStyle} placeholder='Parked Location' value={location} onChangeText={setLocation} maxLength={32} />
              </View>
              {lineSeperator}
              <View style={{ flexDirection: 'row' }}>
                <View style={{ margin: 15 }}>
                  <Icon name="pricetag-outline" size={18} />
                </View>
                <TextInput style={__textStyle} placeholder='Price per Day' value={price} onChangeText={(val) => setPrice(val?.replace(/[^0-9]/g, ''))} keyboardType='numeric' maxLength={3} />
              </View>
              {lineSeperator}
              <View style={{ flexDirection: 'row' }}>
                <View style={{ margin: 15 }}>
                  <IconM name="description" size={18} />
                </View>
                <TextInput style={__textStyle} placeholder='Car Description' value={description} onChangeText={setDescription} />
              </View>
              {lineSeperator}

            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', marginVertical: 20 }}>
              <TouchableOpacity style={[styles.button, styles.shadowProp]} onPress={() => {
                if (name.trim() === "") {
                  return Alert.alert("Please Enter Name, to continue...")
                }
                if (location.trim() === "") {
                  return Alert.alert("Please Enter Parked Location, to continue...")
                }
                if (Number(price) === 0) {
                  return Alert.alert("Please Enter Price per Day, to continue...")
                }
                if (description.trim() === "") {
                  return Alert.alert("Please Enter Short Description, to continue...")
                }

                let data = {
                  name,
                  location,
                  price,
                  description
                }
                writeFirebaseData(data, () => {
                  setName('');
                  setLocation('');
                  setPrice(0);
                  setDescription('');
                  navigation.goBack();
                });
              }}><Text>Save Changes</Text></TouchableOpacity>
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
