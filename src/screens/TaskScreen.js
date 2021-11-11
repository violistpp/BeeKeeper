import React, {useState} from 'react';
import {View, FlatList, StyleSheet, Alert} from 'react-native';
import Header from '../containers/Header';
import ListItem from '../containers/ListItem';
import AddItem from '../containers/AddItem';
import {v4 as uuidv4} from 'uuid';

const TaskScreen = () => {
  const [inputText, setInputText] = useState('');
  const [items, setItems] = useState([
    {id: uuidv4(), title: 'new Project'},
    {id: uuidv4(), title: 'new Project 002'},
    {id: uuidv4(), title: 'new Project 003'},
    {id: uuidv4(), title: 'new Project 004'},
  ]);

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
        return [{id: uuidv4(), title}, ...prevItems];
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Task Name" />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TaskScreen;
