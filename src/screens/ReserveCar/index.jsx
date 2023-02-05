import { View, Text, TouchableOpacity, Image, Alert, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import React from 'react';
import { firebase } from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/Ionicons';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { firebaseConfig } from '../../config/firebaseConfig';
import { carData } from '../../services/data/carsData';
import { lineSeperator } from '../../services/lineSeperator';
import styles from './style';

const __db__ = firebase.app().database(firebaseConfig.databaseURL);

export default function ReserveCarScreen({route, navigation}) {
  const {params} = route;

  function updateFirebaseData(data, cb) {
    const ref = __db__.ref(`/cars/${data.id}`);  //create auto generated key.

    //prepare data to send to firebase. 
    data = carData.prepare_data(data);

    //update data
    ref.update(data).then(() => {
      if(cb){
        cb();
      }
      console.log('-----------------');
      console.log('--------Data UPdated------');
      console.log('-----------------');
      Alert.alert('Updated Successfully');
    });
  }

  React.useEffect(() => {
    const {item} = params;
    if(item === undefined){ navigation.goBack(); }
    setName(item.name);
    setLocation(item.location);
    setPrice(item.price);
    setCurrency(item.currency);
    setDescription(item.description);

  }, [])

  const __textStyle = {
    width: '100%', height: 35,
    marginVertical: 8
  }
  const [name, setName] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [currency, setCurrency] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [days, setDays] = React.useState(0);
  const [userName, setUserName] = React.useState('');
  const [userPhoneNumber, setUserPhoneNumber] = React.useState('');

  console.log(params, '---params---')
  return(
    <>
    <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <ScrollView>
    <View style={{ justifyContent: 'center', alignItems: 'center'}}>
      <View style={[{ justifyContent: 'center', alignItems: 'center'} ,styles.card, styles.shadowProp]}>
        <Image source={require('../../assets/images/car.png')} style={{width: 250, height: 125, resizeMode: 'center'}} />
        
      </View>
      
      <View style={[styles.card, styles.shadowProp]}>

        <View style={{flexDirection: 'row', marginBottom: 15}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 10}}>{name}</Text>
        </View>

        {lineSeperator}

        <View style={{flexDirection: 'row', marginBottom: 15}}>
          <Text style={{fontSize: 16, marginTop: 10}}>Price: </Text>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: 'red', marginTop: 10}}>{currency} {price} / per day</Text>
        </View>

        {lineSeperator}

        <View style={{flexDirection: 'row', marginBottom: 15}}>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Icon name="ios-location-outline" size={18} />
            <Text style={{fontSize: 16}}>Parked Location: </Text>
          </View>
          <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 10}}>{location}</Text>
        </View>

        {lineSeperator}

        <View style={{flexDirection: 'column', marginBottom: 15}}>
          <Text style={{fontSize: 16, marginTop: 10}}>Description: </Text>
          <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 10}}>{description} </Text>
        </View>

        {lineSeperator}
        <View style={{flexDirection: 'row'}}>
          <View style={{margin: 15}}>
            <Icon name="today-outline" size={18}/>
          </View>
          <TextInput style={__textStyle} placeholder='Please Enter Days Here....' value={days} onChangeText={(val) => setDays(val?.replace(/[^0-9]/g, ''))} keyboardType='numeric' maxLength={2} />
        </View>
        {lineSeperator}
        <View style={{flexDirection: 'row'}}>
          <View style={{margin: 15}}>
            <IconAnt name="user" size={18} />
            </View>
          <TextInput style={__textStyle} placeholder='Please Enter Your Name Here....' value={userName} onChangeText={setUserName}/>
        </View>
        {lineSeperator}

        <View style={{flexDirection: 'row'}}>
          <View style={{margin: 15}}>
            <Icon name="ios-phone-portrait-outline" size={18} />
            </View>
          <TextInput style={__textStyle} placeholder='Please Enter Your Phone Number Here....' value={userPhoneNumber} onChangeText={(val) => setUserPhoneNumber(val?.replace(/[^0-9]/g, ''))} keyboardType='numeric' maxLength={12} />
        </View>
        {lineSeperator}

      {Number(days) !== 0 && 
        (<>
          <View style={{flexDirection: 'row', marginVertical: 15}}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Total: </Text>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'red'}}>{currency} {price * days}</Text>
          </View>
          {lineSeperator}
        </>)}

    </View>

    <View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', marginVertical: 20}}>
      <TouchableOpacity 
        style={[styles.button, styles.shadowProp]}
        onPress={() => {
          //days required.
          if(Number(days) === 0) {
            return Alert.alert("Please Enter Days To Reserve Car.")
          }

          if(userName.trim() === ""){
            return Alert.alert("Please Enter Your Name. To continue...")
          }

          if(userPhoneNumber.trim() === ""){
            return Alert.alert("Please Enter Your Phone Number. To continue...")
          }
        
        let data = {
          id: params?.item?.id,
          name, 
          location, 
          price, 
          days,
          currency,
          is_reserved: true,
          reserved_start_time: Date.now(),
          userName, userPhoneNumber
        }

        updateFirebaseData(data, () => {
          navigation.goBack();
        });

      }}>
        <Text>Reserve Car</Text>
      </TouchableOpacity>

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
