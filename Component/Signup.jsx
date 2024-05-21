import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import database from '@react-native-firebase/database';

const Sign = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showPin, setShowPin] = useState(false);

  const handlePhoneNumberChange = (value) => {
    // Ensure only numbers are entered
    const formattedValue = value.replace(/[^0-9]/g, '');

    // Insert "-" after 4 digits and allow up to 11 digits
    let formattedPhoneNumber = '';
    for (let i = 0; i < formattedValue.length; i++) {
      if (i === 4) {
        formattedPhoneNumber += '-';
      }
      formattedPhoneNumber += formattedValue[i];
    }

    setPhoneNumber(formattedPhoneNumber.substring(0, 12)); // Limit to 13 characters
  };

  const handleSubmit = () => {
    // Validate form fields
    if (!firstName || !lastName || !phoneNumber || !pin || !confirmPin) {
      alert('Please fill in all fields');
      return;
    }

    if (phoneNumber.replace(/-/g, '').length !== 11) {
      alert('Please enter a valid phone number');
      return;
    }

    if (pin.length !== 4 || confirmPin.length !== 4) {
      alert('Please enter a 4-digit PIN');
      return;
    }

    if (pin !== confirmPin) {
      alert('PINs do not match');
      return;
    }

    database()
      .ref('Users Data ')
      .push({
        Fname: firstName,
        Lname: lastName,
        Phone: phoneNumber,
        Pin: pin
      })
      .then(() => console.log('Data set'));

      props.navigation.navigate('Third');

    // Clear fields after submission
    clearFields();
  };

  const clearFields = () => {
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setPin('');
    setConfirmPin('');
  };

  return (
    <LinearGradient colors={['#FF7B66', '#FFC3A0']} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            keyboardType="phone-pad"
            maxLength={13} // Allow up to 13 characters including hyphens
          />
          <View style={styles.pinContainer}>
            <TextInput
              style={[styles.input, styles.pinInput]}
              placeholder="Enter PIN"
              value={pin}
              onChangeText={setPin}
              secureTextEntry={!showPin}
              keyboardType="numeric"
              maxLength={4}
            />
            <Icon
              name={showPin ? 'eye-slash' : 'eye'}
              size={20}
              color="#333"
              style={styles.eyeIcon}
              onPress={() => setShowPin(!showPin)}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Confirm PIN"
            value={confirmPin}
            onChangeText={setConfirmPin}
            secureTextEntry={!showPin}
            keyboardType="numeric"
            maxLength={4}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={clearFields}>
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 40,
    color: 'white', // Title text color
  },
  inputContainer: {
    width: '100%',
    marginVertical: 20,
  },
  input: {
    borderRadius: 15,
    backgroundColor: 'white',
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  pinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  pinInput: {
    flex: 1,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: '50%',
    marginTop: -15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Sign;
