import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import database from '@react-native-firebase/database';
import Snackbar from 'react-native-snackbar';

const Login = (props) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);

  const handleLogin = () => {
    if (!phoneNumber || !pin) {
      showSnackbar('Please fill in all fields');
      return;
    }

    database()
      .ref('Users Data ')
      .orderByChild('Phone')
      .equalTo(phoneNumber)
      .once('value')
      .then(snapshot => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const user = Object.values(userData)[0]; // Assuming only one user per phone number
          if (user.Pin === pin) {
            console.log('Login successful for user:', phoneNumber);
            props.navigation.navigate('Fourth');
          } else {
            showSnackbar('Invalid PIN');
          }
        } else {
          showSnackbar('User not found');
        }
      })
      .catch(error => {
        console.error('Login failed: ', error);
        showSnackbar('Login failed');
      });
  };

  const formatPhoneNumber = (input) => {
    // Ensure only numbers are entered
    const formattedValue = input.replace(/[^0-9]/g, '');

    // Insert "-" after 4 digits and allow up to 11 digits
    let formattedPhoneNumber = '';
    for (let i = 0; i < formattedValue.length; i++) {
      if (i === 4) {
        formattedPhoneNumber += '-';
      }
      formattedPhoneNumber += formattedValue[i];
    }

    setPhoneNumber(formattedPhoneNumber.substring(0, 12)); // Limit to 12 characters
  };

  const showSnackbar = (message) => {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
    });
  };

  return (
    <LinearGradient colors={['#FF7B66', '#FFC3A0']} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={formatPhoneNumber}
            keyboardType="phone-pad"
            maxLength={12} // Allow up to 12 characters including hyphens
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
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation.navigate('SignUp')}>
            <Text style={styles.buttonText}>Sign Up</Text>
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

export default Login;
