import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
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
    <LinearGradient colors={['#FF7B66', '#FFC3A0']} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.title}>Login here</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
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
    width: '100%',
    color:'black'
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
  button: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Login;
