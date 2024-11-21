import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import database from '@react-native-firebase/database'; // Import your database module
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library

const SendMoneyScreen = ({ route }) => {
  const { phoneNumber } = route.params;
  const [balance, setBalance] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch balance from the database based on the provided phone number
    const fetchBalance = async () => {
      try {

        const snapshot = await database()
          .ref('Users Data ')
          .orderByChild('Phone')
          .equalTo(phoneNumber)
          .once('value');

        if (snapshot.exists()) {
          const userData = snapshot.val();
          const user = Object.values(userData)[0]; // Assuming only one user per phone number
          setBalance(user.Balance); // Assuming the balance is stored in a property called 'Balance'
        }
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    fetchBalance();

    // Clean up function
    return () => {
      // Perform any cleanup if needed
    };
  }, [phoneNumber]); // Run this effect when the phoneNumber changes

  const handleContinue = () => {
    const amount = parseFloat(enteredAmount);
    if (isNaN(amount)) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount.');
    } else if (amount > balance) {
      Alert.alert('Insufficient Balance', 'The entered amount exceeds the available balance.');
    } else {
      navigation.navigate('Eight', { phoneNumber, amount });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <Text style={styles.currentBalance}>Current balance</Text>
      <Text style={styles.balanceAmount}>{balance}</Text>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        placeholder="Rs. 0"
        placeholderTextColor="#FFFFFF"
        textAlign="center"
        value={enteredAmount}
        onChangeText={text => setEnteredAmount(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF6F61',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
    borderRadius: 5,
  },
  currentBalance: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  balanceAmount: {
    fontSize: 30,
    color: '#FFFFFF',
    marginBottom: 30,
  },
  input: {
    fontSize: 30,
    color: '#FFFFFF',
    marginBottom: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    width: '100%',
    padding: 10,
  },
  button: {
    backgroundColor: '#A52A2A',
    padding: 15,
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
});

export default SendMoneyScreen;
