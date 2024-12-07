// Toast.js
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

const sfToast = ({ message }) => (
  <View style={styles.toastContainer}>
    <Text style={styles.toastText}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  toastContainer: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  toastText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default sfToast;
