import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import SplitScreen from './Component/Home';
import Sign from './Component/Signup';
import SplashScreen from 'react-native-splash-screen';
import Login from './Component/LoginScreen';
import UserVerification from './Component/Userverification';
import SadapayLoginScreen from './Component/Mainhome';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const App = () => {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const handleFormSubmit = () => {
    setSubmitted(true);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
      
        <Stack.Screen
          name="First"
          component={SadapayLoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Second"
          component={Sign}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Third"
          component={UserVerification}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Fifth"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Fourth"
          component={SplitScreen}
          options={{ headerShown: false }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
