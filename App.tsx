import React from 'react';
import { View, StyleSheet } from 'react-native';
import SplitScreen from './Component/Home';

const App = () => {
  return (
    <View style={styles.container}>
      <SplitScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Ensure the container has a white background
  },
});

export default App;
