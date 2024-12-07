import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Animated, Easing, Text , Image} from 'react-native';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import Home from './Home';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function App() {
  const [loginVisible, setLoginVisible] = useState(true);

  const handleNavigateToRegister = () => {
    setLoginVisible(false); // Hide the LoginScreen
    // Optionally, clear any pending or displayed toasts from the LoginScreen
    // Toast.clear(); // Use the appropriate method to clear toasts
  };

  return (
      <NavigationContainer>
        
        <Stack.Navigator initialRouteName="Login">
          {loginVisible && (
            <Stack.Screen name="Login" component={LoginScreen} />
          )}
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            listeners={{
              // Use the beforeRemove event to handle navigation back to LoginScreen
              beforeRemove: (e) => {
                setLoginVisible(true); // Show the LoginScreen before navigating back
              },
            }}
            options={{ headerShown: true }} // Remove the header for RegisterScreen
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ 
              title: 'Tasks',
              headerLeft: null,
              gestureEnabled: false,
              headerShown: false // Remove the header for HomeScreen
            }}
          />
        </Stack.Navigator>
        
      </NavigationContainer>
    );
}

// Include the rest of your components and styles
