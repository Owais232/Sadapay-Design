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
    const transactionRef = database().ref('Transaction History');

    const onTransactionChange = transactionRef.on('value', (snapshot) => {
      if (snapshot.exists()) {
        const transactionsData = snapshot.val();
        const transactionsList = Object.values(transactionsData).filter(
          transaction =>
            transaction.senderPhoneNumber === phoneNumber ||
            transaction.receiverPhoneNumber === phoneNumber
        );
        setTransactions(transactionsList.reverse()); // Show latest transactions first
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
      if (navigation.isFocused()) {
        // If on home screen, handle back press count
        if (backPressCount === 1) {
          BackHandler.exitApp();
        } else {
          setBackPressCount(1);
          ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
          setTimeout(() => setBackPressCount(0), 2000); // Reset back press count after 2 seconds
          return true;
        }
      } else {
        // If there's a previous screen, go back
        navigation.goBack();
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [navigation, backPressCount]);

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

  const renderTransactionItem = ({ item }) => {
    const isSentTransaction = item.senderPhoneNumber === phoneNumber;
    const transactionName = isSentTransaction ? item.receiverName : item.senderName;
    const transactionAmount = isSentTransaction ? `- Rs. ${item.amount}` : `+ Rs. ${item.amount}`;

    return (
      <View style={styles.transactionContainer}>
        <Icon
          name={isSentTransaction ? "arrow-up" : "arrow-down"}
          size={30}
          color={isSentTransaction ? 'red' : 'blue'}
          style={styles.transactionIcon}
        />
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionName}>
            {transactionName || 'Transaction'}
          </Text>
          <Text style={styles.transactionTime}>{new Date(item.timestamp).toLocaleString()}</Text>
        </View>
        <Text style={[styles.transactionAmount, { color: isSentTransaction ? 'red' : 'green' }]}>
          {transactionAmount}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperScreen}>
        <TouchableOpacity style={styles.upperleft} onPress={() => navigation.navigate('Sixth', { phoneNumber })}>
          <Text style={styles.upperText}>Current Balance</Text>
          <Text style={styles.upperBalanceText}>{`Rs. ${balance}`}</Text>
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
            <Text style={styles.upperText}>Load</Text>
            <Text style={styles.lowertext}>Money</Text>
          </View>
          <TouchableOpacity style={styles.sendrequest} onPress={() => navigation.navigate('Seventh', { phoneNumber })}>
            <View style={{ margin: 10 }}>
              <Icon name="arrow-up" size={35} color="white" />
            </View>
            <Text style={styles.upperText}>Send &</Text>
            <Text style={styles.lowertext}>Request</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.lowerScreen}>
        <Text style={styles.title}>Today</Text>
        <FlatList
          data={transactions}
          renderItem={renderTransactionItem}
          keyExtractor={(item, index) => index.toString()}
         
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
  transactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  transactionIcon: {
    marginRight: 20,
  },
  transactionDetails: {
    flex: 1,
    marginRight: 20,
  },
  transactionName: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
  },
  transactionTime: {
    fontSize: 14,
    color: 'grey',
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: 'bold',
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
  upperText: {
    color: 'white',
    fontSize: 19,
    marginLeft: 10,
    marginTop:20
  },
  lowertext:{
    color: 'white',
    fontSize: 19,
    marginLeft: 10,

  },
  upperBalanceText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 19,
    marginLeft: 10,
    marginTop: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    paddingLeft: 20,
    marginTop: 10,
  },
  separator: {
    borderBottomWidth: 0.7,
    borderBottomColor: 'grey',
    marginLeft: 20,
    marginRight: 20,
  },
});

export default SplitScreen;
