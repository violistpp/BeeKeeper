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
const DATA = [
  {id: uuid.v4(), title: 'Suremontuoti rėmelį'},
  {id: uuid.v4(), title: 'Rėmelių detalių surinkimas'},
  {id: uuid.v4(), title: 'Medienos paruošimas'},
  {id: uuid.v4(), title: 'Rėmelių komplektavimas'},
];

const ProjectScreen = item => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [items, setItems] = useState(DATA);
  const navigation = item.navigation;

  return (
    <View style={styles.container}>
      <Header title={item.route.params.item.item.title} />
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
    backgroundColor: 'snow',
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
