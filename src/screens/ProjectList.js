import React, {useState, useContext} from 'react';
import {View, FlatList, StyleSheet, Alert, Button} from 'react-native';
import Header from './../containers/Header';
import ListItem from './../containers/ListItem';
import AddItem from './../containers/AddItem';
import uuid from 'react-native-uuid';
import {UserContext} from '../hooks/UserContext';

const ProjectList = () => {
  const [inputText, setInputText] = useState('');
  const [items, setItems] = useState([
    {id: uuid.v4(), title: 'new Project'},
    {id: uuid.v4(), title: 'new Project 002'},
    {id: uuid.v4(), title: 'new Project 003'},
    {id: uuid.v4(), title: 'new Project 004'},
  ]);
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
        return [{id: uuid.v4(), title}, ...prevItems];
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
        data={items}
        renderItem={({item}) => (
          <ListItem item={item} deleteItem={deleteItem} />
        )}
      />
      <Button title="Go to Details" onPress={signOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProjectList;
