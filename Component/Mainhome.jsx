import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';

const SadapayLoginScreen = (props) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userPhoneNumbers, setUserPhoneNumbers] = useState([]);

  useEffect(() => {
    setPhoneNumber(''); // Clear phoneNumber when the component mounts
    fetchdata();
  }, []);

  const handlePhoneNumberChange = (value) => {
    const formattedValue = value.replace(/[^0-9-]/g, '');
    if (formattedValue.length <= 12) {
      const formattedPhoneNumber = formattedValue.replace(/-/g, '');
      if (formattedPhoneNumber.length > 4) {
        const part1 = formattedPhoneNumber.slice(0, 4);
        const part2 = formattedPhoneNumber.slice(4, 11);
        setPhoneNumber(`${part1}-${part2}`);
      } else {
        setPhoneNumber(formattedPhoneNumber);
      }
    }
  };

  const fetchdata = () => {
    database()
      .ref('Users Data ')
      .on('value', snapshot => {
        if (snapshot.exists()) {
          const numbers = [];
          snapshot.forEach(userSnapshot => {
            const phone = userSnapshot.child('Phone').val();
            numbers.push(phone);
          });
          setUserPhoneNumbers(numbers);
        } else {
          console.log('No data found at the specified path.');
        }
      }, error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleContinue = async () => {
    console.log('Continue button pressed');
    console.log('User input:', phoneNumber);
    if (userPhoneNumbers.includes(phoneNumber)) {
      await AsyncStorage.setItem('lastScreen', JSON.stringify({ screen: 'Fifth', phoneNumber }));
      props.navigation.navigate('Fifth', { phoneNumber });
      console.log('Phone number found in the database');
    } else {
      props.navigation.navigate('Second', { phoneNumber });
      console.log('Phone number not found in the database');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Enter Your Number</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Phone Number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            maxLength={12}
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  topContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bottomContainer: {
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    backgroundColor: '#FF7B66',
    borderRadius: 10,
    paddingVertical: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default SadapayLoginScreen;
