import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import database from '@react-native-firebase/database';

const Sign = ({ navigation, route }) => {
  const { phoneNumber } = route.params;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showPin, setShowPin] = useState(false);

  const handleSubmit = () => {
    // Validate form fields
    if (!firstName || !lastName || !pin || !confirmPin) {
      alert('Please fill in all fields');
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
        Pin: pin,
        Status: 'Pending',
        Balance: '50'
      })
      .then(() => console.log('Data set'));

    navigation.navigate('Third');

    // Clear fields after submission
    clearFields();
  };

  const clearFields = () => {
    setFirstName('');
    setLastName('');
    setPin('');
    setConfirmPin('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Sign Up Form</Text>
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
            editable={false} // Make phone number not editable
            keyboardType="phone-pad"
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
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={[styles.button, styles.buttonLeft]} onPress={clearFields}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonRight]} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Set background color to white
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  topContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    borderRadius: 15,
    backgroundColor: 'white',
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: 'black',
    borderWidth: 1,
    borderColor: '#ccc', // Add border color for input fields
  },
  pinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
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
  button: {
    flex: 1,
    backgroundColor: '#FF7B66',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonLeft: {
    marginRight: 5,
  },
  buttonRight: {
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default Sign;
