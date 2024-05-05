import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import SplitScreen from './Component/Home';
import Sign from './Component/Signup';
import SplashScreen from 'react-native-splash-screen';
import Login from './Component/LoginScreen';
import UserVerification from './Component/Userverification';
import SadapayLoginScreen from './Component/Mainhome';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
const App = () => {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    
    SplashScreen.hide();
  }, []);

  const handleFormSubmit = () => {
    
    setSubmitted(true);
  };

  

  return (
    <View style={styles.container}>
      
      
<SadapayLoginScreen></SadapayLoginScreen>

      {/*{submitted ? <UserVerification navigation={Login} /> : <Sign onSubmit={handleFormSubmit} />}*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
