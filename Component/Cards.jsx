import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import database from '@react-native-firebase/database'; // Import your database module

const VirtualCardScreen = ({ route, navigation }) => {
  const [isFrozen, setIsFrozen] = useState(false);
  const [cardHolderName, setCardHolderName] = useState('');
  const { phoneNumber } = route.params;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const snapshot = await database()
          .ref('Users Data ')
          .orderByChild('Phone')
          .equalTo(phoneNumber)
          .once('value');

        if (snapshot.exists()) {
          const userData = snapshot.val();
          const user = Object.values(userData)[0]; // Assuming only one user per phone number
          setCardHolderName(`${user.Fname} ${user.Lname}`);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [phoneNumber]);

  const handleFreezeCard = () => {
    setIsFrozen(!isFrozen);
    Alert.alert('Card Status', `Your card has been ${!isFrozen ? 'frozen' : 'unfrozen'}`);
  };

  // Generate a random card number
  const generateRandomCardNumber = () => {
    return [
      `${Math.floor(1000 + Math.random() * 9000)}`,
      `${Math.floor(1000 + Math.random() * 9000)}`,
      `${Math.floor(1000 + Math.random() * 9000)}`,
      `${Math.floor(1000 + Math.random() * 9000)}`
    ];
  };

  const cardNumber = generateRandomCardNumber();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={30} color="white" />
      </TouchableOpacity>
      <View style={styles.cardContainer}>
        <Text style={styles.cardText}>Virtual Card</Text>
        <View style={styles.cardNumberContainer}>
          {cardNumber.map((num, index) => (
            <Text key={index} style={styles.cardNumber}>{num}</Text>
          ))}
        </View>
        <View style={styles.cardDetailsContainer}>
          <Text style={styles.cardDetails}>{cardHolderName}</Text>
          <Text style={styles.cardDetails}>VALID THRU 12/24</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.freezeButton} onPress={handleFreezeCard}>
        <Text style={styles.buttonText}>{isFrozen ? 'Unfreeze Card' : 'Freeze Card'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 20,
  },
  cardContainer: {
    width: '85%',
    height: Dimensions.get('window').height / 1.8,
    padding: 20,
    borderRadius: 15,
    backgroundColor: 'grey',
    alignItems: 'center',
    marginBottom: 30,
    justifyContent: 'center',
  },
  cardText: {
    color: 'white',
    fontSize: 24,
    marginBottom: 10,
  },
  cardNumberContainer: {
    marginBottom: 20,
  },
  cardNumber: {
    color: 'white',
    fontSize: 22,
    letterSpacing: 2,
    textAlign: 'left',
  },
  cardDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  cardDetails: {
    color: 'white',
    fontSize: 16,
    marginVertical: 5,
  },
  freezeButton: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    backgroundColor: '#FF7B66',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default VirtualCardScreen;
