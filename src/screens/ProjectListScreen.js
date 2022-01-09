import React, {useState, useContext} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Header from '../containers/Header';
import ProjectItem from '../containers/ProjectItem';
import AddItem from '../containers/AddItem';
import uuid from 'react-native-uuid';
import {UserContext} from '../hooks/UserContext';

const ProjectListScreen = ({navigation}) => {
  const [inputText, setInputText] = useState('');
  const [items, setItems] = useState([
    {id: uuid.v4(), title: 'Medaus sukimas'},
    {id: uuid.v4(), title: 'Rėmelių gamyba'},
    {id: uuid.v4(), title: 'Stogų gamyba'},
    {id: uuid.v4(), title: 'Bičių gydymas'},
  ]);
  const [sortBy, setSortBy] = useState(['id', 'title']);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalInputText, setModalInputText] = useState('');
  const [isRender, setIsRender] = useState(false);
  const [editItem, setEditItem] = useState();
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
      <Header title="Projektų sąrašas" />
      <AddItem
        addItem={addItem}
        inputText={inputText}
        setInputText={setInputText}
      />
      <View style={{marginBottom: 10}} />
      <FlatList
        data={items.sort((a, b) => {
          return a[sortBy[1]] > b[sortBy[1]];
        })}
        renderItem={({item}) => (
          <ProjectItem
            item={item}
            deleteItem={deleteItem}
            navigation={navigation}
            editItem={editItemFn}
          />
        )}
      />
      <TouchableOpacity onPress={signOut}>
        <View style={styles.signOutButton}>
          <Text style={styles.signOutText}>Atsijungti</Text>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Keisti pavadinimą: </Text>
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
              <Text style={styles.buttonText}>Išsaugoti</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              style={[styles.buttonStyle, {backgroundColor: 'darkgrey'}]}>
              <Text style={styles.buttonText}>Atšaukti</Text>
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
  signOutButton: {
    height: 30,
    width: '100%',
    backgroundColor: 'indianred',
  },
  signOutText: {
    color: 'snow',
    fontSize: 18,
    textAlign: 'center',
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

export default ProjectListScreen;
