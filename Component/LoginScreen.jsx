import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import database from '@react-native-firebase/database';
import Snackbar from 'react-native-snackbar';

const Login = ({ route, navigation }) => {
  const { phoneNumber } = route.params;
  const [Number] = useState(phoneNumber); // Phone number is now not editable
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);

  const handleLogin = () => {
    if (!pin) {
      showSnackbar('Please fill in all fields');
      return;
    }

    database()
      .ref('Users Data ')
      .orderByChild('Phone')
      .equalTo(Number)
      .once('value')
      .then(snapshot => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const user = Object.values(userData)[0]; // Assuming only one user per phone number
          if (user.Pin === pin) {
            console.log('Login successful for user:', Number);
            if (user.Status === 'Pending') {
              navigation.navigate('Third');
            } else if (user.Status === 'Approved') {
              navigation.navigate('Fourth', { phoneNumber });
            }
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

  const showSnackbar = (message) => {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Enter Your PIN</Text>
        <View style={styles.inputContainer}>
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
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
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
    backgroundColor: '#fff', // Set background color to white
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
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
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
    width: '100%',
    color: 'black',
    borderWidth: 1,
    borderColor: '#ccc', // Add border color to match the design
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
    backgroundColor: '#FF7B66',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default Login;
