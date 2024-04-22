import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const SplitScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.upperScreen}>
        <View style={styles.upperleft}>
          <Text style={{ color: 'white', fontSize: 19, marginLeft: 10, marginTop: 15 }}>Current Balance</Text>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 19, marginLeft: 10, marginTop: 5 }}>Rs. 1,500</Text>
          <View style={styles.cardandarrow}>
          
          <Icon name="credit-card" size={40} color="white" />
          <Icon name="arrow-right" size={40} color="white" />

          </View>
          
        </View>
        <View style={styles.upperright}>
          <View style={styles.loadmoney}>

            <View style={{margin:10,}}>
            <Icon name="arrow-down" size={35} color="white" />
            </View>
            
          <Text style={{ color: 'white', fontSize: 18, marginLeft: 10, paddingTop:55}}>Load</Text>
          <Text style={{ color: 'white', fontSize: 18, marginLeft: 10, marginTop: 2 }}>Money</Text>

          </View>
          <View style={styles.sendrequest}>

            <View style={{margin:10,}}>
            <Icon name="arrow-up" size={35} color="white" />

            </View>
          <Text style={{ color: 'white', fontSize: 18, marginLeft: 10, paddingTop:55}}>Send &</Text>
          <Text style={{ color: 'white', fontSize: 18, marginLeft: 10, marginTop: 2 }}>Request</Text>
          </View>
        </View>
      </View>
      <View style={styles.lowerScreen}>
        <Text style={{fontSize:30,fontWeight:'bold',color:'black',paddingLeft:20,marginTop:10}}>Today</Text>
        <View style={styles.transaction}>
          <Text style={{fontSize:20,fontStyle:'italic',color:'black'}}> Owais Idrees</Text>
          <Text style={{fontSize:20,fontStyle:'italic',color:'black'}}> Rs,500</Text>
        </View>
        <View style={{ borderBottomWidth: 0.7, borderBottomColor: 'grey',marginLeft:20,marginRight:20 }} />
        
        <View style={styles.transaction}>
          <Text style={{fontSize:20,fontStyle:'italic',color:'black'}}> Saad Aslam</Text>
          <Text style={{fontSize:20,fontStyle:'italic',color:'black'}}> Rs,1500</Text>
        </View>
        <View style={{ borderBottomWidth: 0.7, borderBottomColor: 'grey',marginLeft:20,marginRight:20 }} />
        
        <View style={styles.transaction}>
          <Text style={{fontSize:20,fontStyle:'italic',color:'black'}}> Ahmad Saddiqui</Text>
          <Text style={{fontSize:20,fontStyle:'italic',color:'black'}}> Rs,2500</Text>
        </View>
        <View style={{ borderBottomWidth: 0.7, borderBottomColor: 'grey',marginLeft:20,marginRight:20 }} />
        
        <View style={styles.transaction}>
          <Text style={{fontSize:20,fontStyle:'italic',color:'black'}}> Shuja</Text>
          <Text style={{fontSize:20,fontStyle:'italic',color:'black'}}> Rs,100</Text>
        </View>
        <View style={{ borderBottomWidth: 0.7, borderBottomColor: 'grey',marginLeft:20,marginRight:20 }} />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  cardandarrow:{
    position: 'relative',
    marginTop:210,
    margin:10,
    justifyContent:'space-between',
    right: 0,
    top: 0,
    padding: 10,
    flexDirection:'row'


  },
  transaction:{

    flexDirection:'row',justifyContent:'space-between',margin:10
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  loadmoney: {
    flex: 1,
    backgroundColor: '#27AEFC',
    margin:5,
    marginTop:12,
    borderRadius:15,
  },
  sendrequest: {
    flex: 1,
    backgroundColor: '#FF7B66',
    margin:5,
    borderRadius:15,
    marginBottom:12
  },
  upperleft: {
    flex: 1.3,
    backgroundColor: '#01D2AF',
    margin: 10,
    borderRadius: 15
  },
  upperright: {
    flex: 1,
    flexDirection: 'column',
    
  },
  upperScreen: {
    flex: 1,
    flexDirection: 'row',
  },
  lowerScreen: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    color: 'white',
    fontSize: 30,
  },
});

export default SplitScreen;
