import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Header from '../containers/Header';
import TaskItem from '../containers/TaskItem';
import DateSelection from '../components/DateSelection';
import DrawLine from '../components/DrawLine';
import uuid from 'react-native-uuid';

const ProjectScreen = item => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [items, setItems] = useState([
    {id: uuid.v4(), title: 'Some Task 001'},
    {id: uuid.v4(), title: 'Some Task 002'},
    {id: uuid.v4(), title: 'Some Task 003'},
    {id: uuid.v4(), title: 'Some Task 004'},
    {id: uuid.v4(), title: 'Some Task 005'},
    {id: uuid.v4(), title: 'Some Task 006'},
    {id: uuid.v4(), title: 'Some Task 007'},
    {id: uuid.v4(), title: 'Some Task 008'},
    {id: uuid.v4(), title: 'Some Task 009'},
    {id: uuid.v4(), title: 'Some Task 010'},
  ]);
  const navigation = item.navigation;

  return (
    <View style={styles.container}>
      <Header title={item.route.params.item.title} />
      <Text style={styles.littleHeader}>Term of delivery</Text>
      <DateSelection
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <DrawLine />
      <Text style={styles.littleHeader}>Description</Text>
      <TextInput
        multiline
        editable
        maxLength={40}
        numberOfLines={4}
        onChangeText={text => setDescription(text)}
        value={description}
        placeholder="description..."
        style={{paddingHorizontal: 20}}
      />
      <DrawLine />
      <Text style={styles.littleHeader}>Tasks ({items.length})</Text>
      <FlatList
        data={items}
        renderItem={({item}) => (
          <TaskItem item={item} navigation={navigation} />
        )}
      />
      <DrawLine />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'floralwhite',
  },
  dateTimeStyle: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  littleHeader: {
    alignSelf: 'center',
    paddingVertical: 5,
  },
});

export default ProjectScreen;
