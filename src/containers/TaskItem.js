import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const TaskItem = ({item, navigation}) => {
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => navigation.navigate('Task', {item: {item}})}>
      <View style={styles.listItemView}>
        <Text style={styles.listItemTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemTitle: {
    fontSize: 18,
  },
});

export default TaskItem;
