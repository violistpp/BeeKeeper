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
    <View>
      <TextInput
        value={inputText}
        placeholder="Add Item..."
        onChangeText={onChange}
        style={styles.input}
      />
      <TouchableOpacity onPress={() => addItem(inputText)} style={styles.btn}>
        <Text style={styles.btnText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 60,
    padding: 8,
    fontSize: 16,
  },
  btn: {
    backgroundColor: '#c2bad8',
    padding: 9,
    margin: 5,
  },
  btnText: {
    color: 'darkslateblue',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default AddItem;
