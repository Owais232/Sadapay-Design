import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Login from './LoginScreen';

const UserVerification = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Verification</Text>
      <Text style={styles.text}>
        Thank you for signing up! Your details have been submitted for verification.
        It may take up to 2-3 working days to verify your details.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={()=>navigation.navigate(Login)} // Navigate back to Login screen
      >
        <Text style={styles.buttonText}>Get Back To Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#FF7B66',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default UserVerification;
