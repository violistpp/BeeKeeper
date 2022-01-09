import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalInputText, setModalInputText] = useState('');
  const [isRender, setIsRender] = useState(false);
  const [editItem, setEditItem] = useState();
  const navigation = item.navigation;

  const deleteItem = id => {
    setItems(prevItems => {
      return prevItems.filter(item => item.id !== id);
    });
  };

  const editItemFn = item => {
    setIsModalVisible(true);
    setModalInputText(item.title);
    setEditItem(item.id);
  };

  const handleEditItem = editItem => {
    const newData = items.map(item => {
      if (item.id == editItem) {
        item.title = modalInputText;
        return item;
      }
      return item;
    });
    setItems(newData);
    setIsRender(!isRender);
  };

  const onPressSaveEdit = () => {
    handleEditItem(editItem);
    setIsModalVisible(false);
  };

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
          <TaskItem
            item={item}
            navigation={navigation}
            deleteItem={deleteItem}
            editItem={editItemFn}
          />
        )}
      />
      <DrawLine />
      <Modal
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Change Title: </Text>
          <TextInput
            style={styles.modalTextInput}
            onChangeText={text => setModalInputText(text)}
            defaultValue={modalInputText}
            editable={true}
            maxLength={200}
          />
          <View style={styles.buttonsLine}>
            <TouchableOpacity
              onPress={() => onPressSaveEdit()}
              style={[
                styles.buttonStyle,
                {backgroundColor: 'goldenrod', marginRight: 5},
              ]}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              style={[styles.buttonStyle, {backgroundColor: 'darkgrey'}]}>
              <Text style={styles.buttonText}>Cancle</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalText: {
    fontSize: 20,
    marginBottom: 10,
  },
  modalTextInput: {
    width: '90%',
    height: 70,
    borderColor: 'goldenrod',
    borderWidth: 1,
    fontSize: 18,
    borderRadius: 30,
    padding: 15,
    marginBottom: 20,
  },
  modalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  buttonText: {
    color: 'snow',
    fontSize: 18,
  },
  buttonStyle: {
    paddingHorizontal: 30,
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default ProjectScreen;
