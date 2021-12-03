import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions
} from 'react-native';
import Header from '../containers/Header';
import DateSelection from '../components/DateSelection';
import TimeSelection from '../components/TimeSelection';
import DrawLine from '../components/DrawLine';
import uuid from 'react-native-uuid';

const screen = Dimensions.get('window');

const TaskScreen = item => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [description, setDescription] = useState('');
  const [items, setItems] = useState([
    {id: uuid.v4(), title: 'Some Task Work Hour 001'},
    {id: uuid.v4(), title: 'Some Task Work Hour 002'},
    {id: uuid.v4(), title: 'Some Task Work Hour 003'},
    {id: uuid.v4(), title: 'Some Task Work Hour 004'},
    {id: uuid.v4(), title: 'Some Task Work Hour 005'},
    {id: uuid.v4(), title: 'Some Task Work Hour 006'},
    {id: uuid.v4(), title: 'Some Task Work Hour 007'},
    {id: uuid.v4(), title: 'Some Task Work Hour 008'},
    {id: uuid.v4(), title: 'Some Task Work Hour 009'},
    {id: uuid.v4(), title: 'Some Task Work Hour 010'},
  ]);

  const startCounting = () => {};

  return (
    <View style={styles.container}>
      <Header title="Task" />
      <Text style={styles.littleHeader}>Term of delivery</Text>
      <DateSelection
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <TimeSelection
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.buttonStyle, {backgroundColor: 'khaki'}]} onPress={() => startCounting()}>
          <Text>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonStyle, {backgroundColor: 'lightcoral'}]}>
          <Text>Stop</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonStyle, {backgroundColor: 'lightgreen'}]}>
          <Text>Done</Text>
        </TouchableOpacity>
      </View>
      <DrawLine />
      <FlatList
        data={items}
        renderItem={({item}) => <Text style={{height: 60}}>{item.title}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'floralwhite',
  },
  littleHeader: {
    alignSelf: 'center',
    paddingVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'oldlace',
    height: 40,
    // justifyContent: 'space-between',
    // borderColor: 'gainsboro',
    // borderWidth: 1,
  },
  buttonStyle: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TaskScreen;
