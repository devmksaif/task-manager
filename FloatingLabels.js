import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const FloatingLabelInput = ({ label, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={isFocused ? label : ''}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={styles.input}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    marginBottom: 20,
  },
  input: {
    height: 40,
    fontSize: 16,
  },
});

export default FloatingLabelInput;
