import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Header from '../containers/Header';
import DateSelection from '../components/DateSelection';
import TimeSelection from '../components/TimeSelection';
import DrawLine from '../components/DrawLine';
import uuid from 'react-native-uuid';
import ButtonHexagon from '../components/ButtonHexagon';

const screen = Dimensions.get('window');
const formatNumber = number => `0${number}`.slice(-2);

const getRemaining = time => {
  const hours = Math.floor(time / 60 / 60);
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return {
    hours: formatNumber(hours),
    mins: formatNumber(mins),
    secs: formatNumber(secs),
  };
};

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
  const [remainingSecs, setRemainingSecs] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const {hours, mins, secs} = getRemaining(remainingSecs);

  const toggle = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setRemainingSecs(remainingSecs => remainingSecs + 1);
      }, 1000);
    } else if (!isActive && remainingSecs !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, remainingSecs]);

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
      <View style={styles.actionContainer}>
        <Text style={styles.timerText}>{`${hours}:${mins}:${secs}`}</Text>
        <TouchableOpacity>
          <ButtonHexagon toggle={toggle} isActive={isActive} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={items}
        renderItem={({item}) => (
          <Text
            style={{
              height: 60,
              textAlignVertical: 'center',
              paddingHorizontal: 20,
            }}>
            {item.title}
          </Text>
        )}
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
  actionContainer: {
    flexDirection: 'row',
    backgroundColor: 'oldlace',
    height: 43.99,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  buttonStyle: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 30,
  },
});

export default TaskScreen;
