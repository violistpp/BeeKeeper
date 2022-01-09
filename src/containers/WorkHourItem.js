import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const WorkHourItem = ({item, editItem}) => {
  return (
    <View style={styles.container}>
      <View style={styles.listItem}>
        <View style={styles.listItemView}>
          <Text style={styles.listItemTitle}>{item.title}</Text>
          <Text style={styles.listItemTitle}>{item.interval}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => editItem(item)}>
        <View style={styles.editButton}>
          <Icon name="edit" size={25} color="snow" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: 'snow',
  },
  listItem: {
    padding: 15,
  },
  listItemView: {
    justifyContent: 'space-between',
  },
  listItemTitle: {
    fontSize: 18,
  },
  editButton: {
    padding: 10,
    backgroundColor: 'goldenrod',
    paddingRight: 35,
    marginRight: -30,
    borderRadius: 30,
  },
});

export default WorkHourItem;
