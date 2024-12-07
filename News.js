import React, { useState , useEffect} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity,ScrollView } from 'react-native';
import { Ionicons, FontAwesome6, MaterialIcons,MaterialCommunityIcons ,FontAwesome5} from '@expo/vector-icons';


const TaskItem = ({ name, dateDue, description , id}) => (
  <View style={styles.taskItem}>
    <View style={styles.taskItemContainer}>
    <View style={styles.divider}/>
      <View style={styles.taskHeader}>
        <Text style={styles.taskHeaderText}>Task Name: </Text>
        <Text style={styles.description}>{name}</Text>
        
      </View>
      <View style={styles.divider}/>
      <View style={styles.taskHeader}>
      <Text style={styles.taskHeaderText}>Date Due:</Text>
      <Text style={styles.description}>{dateDue}</Text>
      </View>
      <View style={styles.divider}/>
      <View style={styles.taskHeader}>
      <Text style={styles.taskHeaderText}>Description: </Text>
      <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  </View>
);

const News = ({ Username }) => {
  const [tasks, setTasks] = useState([]);
  console.log(Username)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.1.105:5000/get_tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: String(Username).toLowerCase() }),
        });
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        console.log('Fetched tasks:', data.tasks); // Log fetched tasks
        setTasks(data.tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
      }
    };
    
    fetchData();
  }, [Username]);

  console.log('Tasks state:', tasks); // Log tasks state

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
       <TouchableOpacity style={styles.button}>
    <MaterialIcons name='add-task' style={styles.IconAdd} size={24} color='green'/>
      <Text style={styles.btnText}>New Task</Text>
    </TouchableOpacity>
        <Text style={styles.heading}>Tasks List</Text>
        <View style={styles.tasksContainer}>
          {tasks.map((task, index) => (
            <TaskItem key={index} {...task} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({

  
  coContainer:{
    flex: 1,
    width: '100%',
  },
  mainContainer:{
    alignItems:'center',
    justifyContent: 'center',
    
    
  },
  tasksContainer:{
    width: '100%',
    height:'80%',
    
    borderRadius: 20,
  },
  taskItemContainer:{
      backgroundColor:'white',
      borderWidth:0.7,
      padding:10,
      borderRadius:20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
  },
  heading:{
    fontSize: 20,
    marginBottom:20, 
    backgroundColor:'#fff',
    shadowOffset:{
        width:2,
        height:3,
    },
    elevation:5,
    fontWeight: 'bold',
    borderRadius:15,
    alignContent:'center',
    flexDirection:'row',
    alignSelf:'center',
    textAlign:'center',
    marginTop: 20,
    borderWidth: 1,
    width:'80%'
  },
  button:{
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
    width: '100%',
    borderColor: 'green',
  },
  buttonTask:{
    shadowOffset:{
      width:2,
      height:3,
    },
    elevation:5,
    backgroundColor: 'white',
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
    width: '100%',
    borderColor: 'green',
  },
  btnText:{
      color:'green',
      paddingVertical: 1,
      fontSize: 20,
      alignSelf:'center'
  },
  IconAdd:{
    marginLeft: 10,
    marginBottom: 5
  },
  divider:{
    backgroundColor:'black',
    height:1,
    marginVertical: 20,
  },
  taskItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 5,
    shadowOpacity: 0.2,
    shadowOffset:{
      width:2,
      height:3,
    },
    borderWidth:0.5,

    
  },
  taskItemContainer: {
    padding: 15,
    width:'100%'
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  taskHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
})


export default News;
