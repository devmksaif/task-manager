import React, { useState, useEffect } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView , Image} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Import AntDesign icons
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';









export default function LoginScreen({ navigation }) {
  
  
 


  const handleRegisterClick = () => {
    navigation.navigate('Register');
  };
  
 
 
    
  
  const [loginUsername , setLoginUserName] = useState('')
  const [loginPassword, setLoginPassword] = useState('')


  const [isLoggedIn,setIsLoggedIn] = useState(false)
  const handleHome = () => {
    
  
    data = 
    {
      isLoggedIn: isLoggedIn,
      Username: String(loginUsername)
    }
      navigation.navigate('Home',data)
    
    
  };




const checkAlpha = (text) =>
{
  let alphabets = /^[A-Za-z0-9.]+$/;
  return alphabets.test(text)
}


const sendPostApi = (user,password,url) =>
{
// Data to be sent in the request body
const postData = {
  'username': user,
  'password': password
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
      throw new Error('Error')
    }
    return response.json(); // Parse the response body as JSON
  })
  .then(data => {
    messageCode = parseInt(data['code'])
    switch(messageCode)
    {
      case 0:
        throw Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody: 'Username or password is incorrect',
        })
        break;
      case 1:
        setIsLoggedIn(true);
        throw Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: 'Authenticated successfully',
        });
        setTimeout(() =>
        {
          
          handleHome();
          
        },1000)
        
        break;
      default :
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody: 'Unknown error occured',
        });
        break;
    }

  })
  .catch(error => {
    throw new Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: 'Unknown error occured',
    })
  });
}


const checkInput = (username, password) => {
  if(String(username).length==0 || String(password).length==0)
  {
    throw Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: 'Fields should not be empty',
    })
    return false;
  }else if (!checkAlpha(String(username).trim())){
    
    throw Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: 'Username is invalid',
    })
    return false;
  }
  return true;

}

  const handleLogin = () =>
  {
      let username = String(loginUsername).toLowerCase();
      let password = String(loginPassword).toLowerCase();
      if(checkInput(username, password))
      {
        sendPostApi(username, password,"http://192.168.1.105:5000/check_user")
      }
  }
 
  return (
    
    <AlertNotificationRoot>
    <View style={styles.container}>
         

    
      <View style={styles.loginContainer}>
      <View>
      
      </View>
        <Image style={styles.image} source={require('./taskswift.png')} />
        <View style={styles.inputContainer}>
        <AntDesign name="mail" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Username or Email"
            placeholderTextColor="#aaa"
            onChangeText={setLoginUserName}
            value={loginUsername}
          />
            

          
        </View>
        <View style={styles.inputContainer}>
        <AntDesign name="lock" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry={true}
            onChangeText={setLoginPassword}
            value={loginPassword}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <AntDesign name='login' size={24} style={styles.iconLogin}/>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegisterClick} style={styles.createButton}>
          <Text style={styles.createAccountText}>Create new account ?</Text>
        </TouchableOpacity>
       
        
      </View>
      
    </View>
    </AlertNotificationRoot>

  );
}

 // Reset input fields when the screen gains focus
 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  loginContainer: {
    alignItems: 'center',
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginTop:5,
    borderColor: '#ccc',
    borderRadius: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
  },
  createButton:{
    padding: 12,
    
    
    alignSelf: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    color: '#333',
    borderRadius: 20,
    margin: 5,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 60,
    flexDirection: 'row-reverse',
    backgroundColor: '#00000000',
    borderRadius: 10,
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  iconLogin:{
    marginLeft: 10,
    paddingLeft:10,
  },
  createAccountText: {
    color: '#007bff',
    fontSize: 16,
    marginTop: 10,
  },
  image: {
    marginBottom: 50,
    marginTop: 80,
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  
});
