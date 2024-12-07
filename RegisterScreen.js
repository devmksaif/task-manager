import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView , Image, KeyboardAvoidingView} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Import AntDesign icons
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';





const RegisterScreen = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [dob, setDOB] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const checkInputs =() =>
  {
   
      if (!String(fullName)) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody: 'Full name is empty',
        })
        return false;
      }
      if (!String(email)) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody: 'Email is empty',
        })
        return false;
      }
      if (!String(telephone)) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody: 'Phone number is invalid',
        })
        return false;
      }
      if (!String(dob)) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody: 'Date of birth is empty',
        })
        return false;
      }
      if (!String(password)) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody: 'Password is empty',
        })
        return false;
      }
      if (!String(confirmPassword)) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody: 'Confirm password is empty',
        })
        return false;
      }
    
      // Check if the email is valid
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(String(email))) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody: 'Email address is invalid',
        })
        return false;
      }
    
      // Check if the password meets the minimum length requirement
      const minPasswordLength = 8;
      if (password.length < minPasswordLength) {
       
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody: `Password must be at least ${minPasswordLength} characters long`,
        })
        return false;
      }
    
      // Check if password and confirm password match
      if (String(password) !== String(confirmPassword)) {
       
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody: `Passwords do not match`,
        })
        return false;
      }
    
      // Check if the DOB matches the YYYY-MM-DD format
      const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dobRegex.test(String(dob))) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody: `Date of Birth must be in the format YYYY-MM-DD`,
        })
        return false;
      }
    
      // Additional validation checks for other fields
    
      
      return true;
    
    
  }
  const sendPostApi = (fullName, email, telephone, dob, password, confirmPassword, url) =>
  {
  // Data to be sent in the request body
  const postData = {
    'fullName': fullName,
    'email': email,
    'telephone': telephone,
    'dob': dob,
    'password': password,
    'confirmPassword': confirmPassword
  };
  
  // Configuring the request
  const requestOptions = {
    method: 'POST', // HTTP method
    headers: {
      'Content-Type': 'application/json' // Specify content type as JSON
    },
    body: JSON.stringify(postData) // Convert JavaScript object to JSON string
  };
  
  // Sending the request
  fetch(url, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw Toast.error('Problem with the server');
      }
      return response.json(); // Parse the response body as JSON
    })
    .then(data => {
      messageCode = parseInt(data['code'])
      switch(parseInt(messageCode))
      {
        case 0:
          Toast.error("Email already exist")
          break;
        case 1:
          Toast.error("Username already exist")
          break;
        case 2:
          Toast.success("Registration successful")
          setTimeout(() => navigation.navigate('Login'),1000)
          
          
          break;
        default :
          Toast.info(`Unknown Error`)
          break;
      }
  
    })
    .catch(error => {
      Toast.error(String(error));
    });
  }
  
  
  const handleRegister = () => {

    if(checkInputs())
    {
      sendPostApi(fullName, email, telephone, dob, password, confirmPassword,'http://192.168.1.105:5000/register_user')
    }
   
  };

  return (
    <AlertNotificationRoot>
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
    <ScrollView contentContainerStyle={styles.container}>
   <View style={styles.header}>
   
      
  
</View>
   <View style={styles.toastContainer}>
        
          
 
      </View>
      <View style={styles.inputContainer}>
      <Image style={styles.image} source={require('./taskswift.png')} />
     
      
        <Text style={styles.label}>Full Name</Text>
        <View style={styles.input}>
          <AntDesign name="user" size={24} color="black" style={styles.icon} />
          <TextInput
          placeholderTextColor="#aaa"
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.input}>
          <AntDesign name="mail" size={24} color="black" style={styles.icon} />
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Telephone</Text>
        <View style={styles.input}>
          <AntDesign name="phone" size={24} color="black" style={styles.icon} />
          <TextInput
            placeholder="Enter your telephone number"
            value={telephone}
            placeholderTextColor="#aaa"
            onChangeText={setTelephone}
            keyboardType="phone-pad"
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date of Birth</Text>
        <View style={styles.input}>
          <AntDesign name="calendar" size={24} color="black" style={styles.icon} />
          <TextInput
            placeholderTextColor="#aaa"
            placeholder="Enter your date of birth (YYYY-MM-DD)"
            value={dob}
            onChangeText={setDOB}
          />
        </View>
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.input}>
          <AntDesign name="lock" size={24} color="black" style={styles.icon} />
          <TextInput
            placeholder="Enter your password"
            value={password}
            placeholderTextColor="#aaa"
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.input}>
          <AntDesign name="lock" size={24} color="black" style={styles.icon} />
          <TextInput
            placeholder="Confirm your password"
            value={confirmPassword}
            placeholderTextColor="#aaa"
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </ScrollView>
    </KeyboardAvoidingView>
   </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  toastContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999, // Make sure Toast stays on top
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingBottom: 50,
    paddingTop: 50, // Adjust as needed to make space for Toast
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
    marginTop: 50,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    color: '#333',
    fontSize: 16,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#00000000',
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Align items with space between them
    marginBottom: 20,
  },
  leftHeader: {
    width: 50, // Adjust the width as needed
  },
  rightHeader: {
    width: 50, // Adjust the width as needed
  },
  image: {
    marginBottom: 25,
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  text: {
    marginHorizontal: 10,
    color: '#333',
  },
  toast: {
    verticalAlign: 'top',
    position: 'absolute',
    duration: 1000,
    shadow: true,
    position: 'bottom',
    positionValue: '100',
    width: '95%',
  }
});

export default RegisterScreen;
