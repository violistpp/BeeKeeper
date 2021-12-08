import React, {useState, useContext} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import Header from '../containers/Header';
import ProjectItem from '../containers/ProjectItem';
import AddItem from '../containers/AddItem';
import uuid from 'react-native-uuid';
import {UserContext} from '../hooks/UserContext';

const ProjectListScreen = ({navigation}) => {
  const [inputText, setInputText] = useState('');
  const [items, setItems] = useState([
    {id: uuid.v4(), title: 'new Project 001'},
    {id: uuid.v4(), title: 'new Project 003'},
    {id: uuid.v4(), title: 'new Project 002'},
    {id: uuid.v4(), title: 'new Project 004'},
  ]);
  const [sortBy, setSortBy] = useState(['id', 'title']);
  const {signOut} = useContext(UserContext);

  const deleteItem = id => {
    setItems(prevItems => {
      return prevItems.filter(item => item.id !== id);
    });
  };

  const addItem = title => {
    if (!title) {
      Alert.alert('Error', 'please enter an item');
    } else {
      setInputText('');
      setItems(prevItems => {
        return [{id: uuid.v4(), title}, ...prevItems].sort((a, b) => {
          return a[sortBy[1]] > b[sortBy[1]];
        });
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header title="All Projects" />
      <AddItem
        addItem={addItem}
        inputText={inputText}
        setInputText={setInputText}
      />
      <FlatList
        data={items.sort((a, b) => {
          return a[sortBy[1]] > b[sortBy[1]];
        })}
        renderItem={({item}) => (
          <ProjectItem
            item={item}
            deleteItem={deleteItem}
            navigation={navigation}
          />
        )}
      />
      <TouchableOpacity onPress={signOut}>
        <View style={styles.signOutButton}>
          <Text style={styles.signOutText}>Go to Details</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'oldlace',
  },
  signOutButton: {
    height: 50,
    width: '100%',
    backgroundColor: 'indianred',
  },
  signOutText: {
    color: 'snow',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default ProjectListScreen;
