import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useRoute } from '@react-navigation/native';

import News from './News';

const Home = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('Home');
  const route = useRoute();
  const { isLoggedIn, Username } = route.params;

  if (!isLoggedIn) {
    navigation.navigate("Login");
  }

  const setFalse = () => {
    isLoggedIn = false;
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'Home':
        return <News Username={Username} />;
      case 'Profile':
        return <Text>Profile Screen Content</Text>;
      case 'Settings':
        return <Text>Settings Screen Content</Text>;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topMenu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => setSelectedTab('Completed')}>
          <Ionicons name="checkmark-circle" size={32} color="green" />
          <Text style={styles.menuText}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => setSelectedTab('Ongoing')}>
          <Ionicons name="timer" size={32} color="orange" />
          <Text style={styles.menuText}>Ongoing</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => setSelectedTab('Aborted')}>
          <Ionicons name="close-circle" size={32} color="red" />
          <Text style={styles.menuText}>Aborted</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>{renderContent()}</View>
      <View style={styles.bottomTabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setSelectedTab('Home')}>
          <Ionicons
            name={selectedTab === 'Home' ? 'home' : 'home-outline'}
            size={24}
            color={selectedTab === 'Home' ? 'black' : 'grey'}
          />
          <Text style={[styles.tabText, { color: selectedTab === 'Home' ? 'black' : 'grey' }]}>
            Tasks
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setSelectedTab('Profile')}>
          <Ionicons
            name={selectedTab === 'Profile' ? 'person' : 'person-outline'}
            size={24}
            color={selectedTab === 'Profile' ? 'black' : 'grey'}
          />
          <Text style={[styles.tabText, { color: selectedTab === 'Profile' ? 'black' : 'grey' }]}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    width:'100%'
  },
  topMenu: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 25,
    width: '100%',
  },
  
  gearIcon: {
    padding: 5,
  },
  msgIcon: {
    padding: 5,
  },
  content: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal:20,
    width:'100%'
  },
  bottomTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
  },
  tabItem: {
    alignItems: 'center',
    width:'100%'
  },
  tabText: {
    color: 'black',
  },
  containerBox: {
    borderWidth: 2,
    marginTop: 20,
    borderRadius: 15,
    padding: 5,
    width: '100%',
    height: '100%',
    elevation: 5,
    backgroundColor: '#ffffff',
  },
  heading: {
    fontWeight: 'bold',
    paddingRight: 50,
  },
});

export default Home;
