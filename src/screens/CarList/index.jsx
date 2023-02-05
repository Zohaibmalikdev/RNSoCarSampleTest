
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, FlatList, Image } from 'react-native';
import React from 'react';
import { useIsFocused } from '@react-navigation/native';
import { firebase } from '@react-native-firebase/database';
import { firebaseConfig } from '../../config/firebaseConfig';
import styles from './style';

const __db__ = firebase.app().database(firebaseConfig.databaseURL);

export default function CarListScreenDrawer({route, navigation}) {
  const [carList, setCarList] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    getCarList();
  }, []);

  React.useEffect(() => {
    if(isFocused){
      getCarList(); //make sure the list is always updated.
    }
  }, [isFocused])

  function getCarList() {
      setCarList([]);
      getFirebaseData();
      // getFirebaseDataMock();
      setRefreshing(false);
  }

  function getFirebaseDataMock(){
    setCarList(__data__);
  }

  function getFirebaseData() {
    const newRef = __db__.ref(`/cars/`).once('value');  //create auto generated key.
    newRef.then((snapshot) => {
      const __value = snapshot.val(); //Json Object.
      let __FirebaseObjectToArray = [];

      if(Object.keys(__value).length > 0) {
        Object.keys(__value).map(id => {
          __FirebaseObjectToArray.push({
            id: id, ...__value[id]
          })
        })
  
        setCarList(__FirebaseObjectToArray);
      }else{
        //TODO: Set the Message List iS Empty....
      }
      console.log('-----------------');
      console.log('--------Cars Listed successfulyy------');
      console.log('-----------------');
    })
  }

  return(
    <>
    <SafeAreaView style={styles.container}>
      <FlatList
          data={carList}
          renderItem={({item}) => (
            <>
            {item.is_reserved !== true && 
              <TouchableOpacity onPress={() => {
                if(item.is_reserved === true) return;
                navigation.navigate('ReserveCar', {item});
              }}>
                <View style={styles.item}>
                  <View style={[{flexDirection: 'row'}, styles.card, styles.shadowProp]}>
                    <Image source={require('../../assets/images/car.png')} style={{width: 125, height: 75, resizeMode: 'center'}} />
                    
                    <View style={
                        {flexDirection: 'column', 
                         padding: 8, marginLeft: 10, 
                        }}>
                      {/* <Text>ID: {item.id}</Text> */}
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 20}}>{item.name}</Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 10}}>Price: </Text>
                        <Text style={{fontSize: 16, fontWeight: 'bold', color: 'red', marginTop: 10}}>{item.currency} {item.price} / per day</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            }
            </>
          )}
          onRefresh={() => {
            setRefreshing(true);
            getCarList();
          }}
          refreshing={refreshing}
        
        />
    </SafeAreaView>
    </>
  )
};

const __data__ = [
  {"currency": "RM", "description": "4 wheeler perfect for family", "id": "-NNRTzPsRdfvdt0fB_bGfsx", "is_rented": false, "is_reserved": false, "location": "Klcc park", "maxed_days": 10, "name": "Proton x50", "price": 150, "reserved_for_days": 0, "total": 0},
  {"currency": "RM", "description": "4 wheeler perfect for family", "id": "-NNRTzPsRdfvdt0fB_bGdfs", "is_rented": false, "is_reserved": false, "location": "Klcc park", "maxed_days": 10, "name": "Proton x70", "price": 170, "reserved_for_days": 0, "total": 0},
  {"currency": "RM", "description": "perfect ride for family", "id": "-NNRUsq76I87xE5Uivohgh", "is_rented": false, "is_reserved": true, "location": "Klcc Park", "maxed_days": 10, "name": "Proton Saga", "price": 80, "reserved_end_time": 1675861067623, "reserved_for_days": 4, "reserved_start_time": 1675515467623, "total": 320},
  {"currency": "RM", "description": "perfect ride for family", "id": "-NNRUsq34234xE5Uivohhg", "is_rented": false, "is_reserved": true, "location": "Klcc Park", "maxed_days": 10, "name": "Proton Myvi", "price": 60, "reserved_end_time": 1675861067623, "reserved_for_days": 4, "reserved_start_time": 1675515467623, "total": 320},
  
  {"currency": "RM", "description": "perfect ride for family", "id": "-NNRUsq34234xE5Uivsdfs", "is_rented": false, "is_reserved": true, "location": "Klcc Park", "maxed_days": 10, "name": "Proton Myvi", "price": 60, "reserved_end_time": 1673179405000, "reserved_for_days": 4, "reserved_start_time": 1672833805000, "total": 320},
  {"currency": "RM", "description": "perfect ride for family", "id": "-NNRUsq34234xE5Uidsafs", "is_rented": false, "is_reserved": true, "location": "Klcc Park", "maxed_days": 10, "name": "Proton Myvi", "price": 60, "reserved_end_time": 1673525005000, "reserved_for_days": 4, "reserved_start_time": 1673179405000, "total": 320}

];