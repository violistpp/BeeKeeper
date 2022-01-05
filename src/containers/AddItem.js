import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const AddItem = ({addItem, inputText, setInputText}) => {
  const onChange = textValue => setInputText(textValue);

  return (
    <View style={styles.container}>
      <TextInput
        value={inputText}
        placeholder="Add New Project..."
        onChangeText={onChange}
        style={styles.input}
      />
      <TouchableOpacity
        onPress={() => addItem(inputText)}
        style={styles.addBtn}>
        <Text style={styles.btnText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  input: {
    width: '85%',
    height: 60,
    padding: 8,
    fontSize: 16,
  },
  addBtn: {
    width: '20%',
    marginLeft: 1,
    paddingLeft: -5,
    backgroundColor: 'goldenrod',
    padding: 9,
    margin: 5,
    borderRadius: 30,
  },
  btnText: {
    color: 'snow',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default AddItem;
