import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, BackHandler, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplitScreen = ({ route, navigation }) => {
  const { phoneNumber } = route.params;
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [backPressCount, setBackPressCount] = useState(0);

  useEffect(() => {
    const userRef = database()
      .ref('Users Data ')
      .orderByChild('Phone')
      .equalTo(phoneNumber);

    const onValueChange = userRef.on('value', (snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        const user = Object.values(userData)[0];
        setBalance(user.Balance);
      }
    });

    return () => {
      userRef.off('value', onValueChange);
    };
  }, [phoneNumber]);

  useEffect(() => {
    const transactionRef = database().ref('Transaction History').orderByChild('senderPhoneNumber').equalTo(phoneNumber);

    const onTransactionChange = transactionRef.on('value', (snapshot) => {
      if (snapshot.exists()) {
        const transactionsData = snapshot.val();
        const transactionsList = Object.values(transactionsData);
        setTransactions(transactionsList);
      } else {
        setTransactions([]);
      }
    });

    return () => {
      transactionRef.off('value', onTransactionChange);
    };
  }, [phoneNumber]);

  useEffect(() => {
    const backAction = () => {
      if (backPressCount === 1) {
        BackHandler.exitApp();
      } else {
        setBackPressCount(1);
        ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
        setTimeout(() => setBackPressCount(0), 2000); // Reset back press count after 2 seconds
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [backPressCount]);

  useEffect(() => {
    // Save the current route when the component mounts
    const saveCurrentScreen = async () => {
      try {
        await AsyncStorage.setItem('lastScreen', JSON.stringify({ screen: 'Fourth', phoneNumber }));
      } catch (e) {
        console.error('Failed to save the current screen.', e);
      }
    };

    saveCurrentScreen();
  }, [phoneNumber]);

  const renderTransactionItem = ({ item }) => (
    <View style={styles.transaction}>
      <Text style={{ fontSize: 20, fontStyle: 'italic', color: 'black' }}>{item.receiverName}</Text>
      <Text style={{ fontSize: 20, fontStyle: 'italic', color: 'black' }}>Rs. {item.amount}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.upperScreen}>
        <TouchableOpacity style={styles.upperleft} onPress={() => navigation.navigate('Sixth', { phoneNumber })}>
          <Text style={{ color: 'white', fontSize: 19, marginLeft: 10, marginTop: 15 }}>Current Balance</Text>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 19, marginLeft: 10, marginTop: 5 }}>Rs. {balance}</Text>
          <View style={styles.cardandarrow}>
            <Icon name="credit-card" size={40} color="white" />
            <Icon name="arrow-right" size={40} color="white" />
          </View>
        </TouchableOpacity>
        <View style={styles.upperright}>
          <View style={styles.loadmoney}>
            <View style={{ margin: 10 }}>
              <Icon name="arrow-down" size={35} color="white" />
            </View>
            <Text style={{ color: 'white', fontSize: 18, marginLeft: 10, paddingTop: 55 }}>Load</Text>
            <Text style={{ color: 'white', fontSize: 18, marginLeft: 10, marginTop: 2 }}>Money</Text>
          </View>
          <TouchableOpacity style={styles.sendrequest} onPress={() => navigation.navigate('Seventh', { phoneNumber })}>
            <View style={{ margin: 10 }}>
              <Icon name="arrow-up" size={35} color="white" />
            </View>
            <Text style={{ color: 'white', fontSize: 18, marginLeft: 10, paddingTop: 55 }}>Send &</Text>
            <Text style={{ color: 'white', fontSize: 18, marginLeft: 10, marginTop: 2 }}>Request</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.lowerScreen}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'black', paddingLeft: 20, marginTop: 10 }}>Today</Text>
        <FlatList
          data={transactions}
          renderItem={renderTransactionItem}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => (
            <View style={{ borderBottomWidth: 0.7, borderBottomColor: 'grey', marginLeft: 20, marginRight: 20 }} />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardandarrow: {
    position: 'relative',
    marginTop: 210,
    margin: 10,
    justifyContent: 'space-between',
    right: 0,
    top: 0,
    padding: 10,
    flexDirection: 'row',
  },
  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  loadmoney: {
    flex: 1,
    backgroundColor: '#27AEFC',
    margin: 5,
    marginTop: 12,
    borderRadius: 15,
  },
  sendrequest: {
    flex: 1,
    backgroundColor: '#FF7B66',
    margin: 5,
    borderRadius: 15,
    marginBottom: 12,
  },
  upperleft: {
    flex: 1.3,
    backgroundColor: '#01D2AF',
    margin: 10,
    borderRadius: 15,
  },
  upperright: {
    flex: 1,
    flexDirection: 'column',
  },
  upperScreen: {
    flex: 1,
    flexDirection: 'row',
  },
  lowerScreen: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    color: 'white',
    fontSize: 30,
  },
});

export default SplitScreen;
