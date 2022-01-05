import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const WorkHourItem = ({item, editItem}) => {
  return (
    <View style={styles.container}>
      <View style={styles.listItem}>
        <View style={styles.listItemView}>
          <Text style={styles.listItemTitle}>{item.title}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.listItem} onPress={() => editItem(item)}>
        <View style={styles.listItemView}>
          <Text style={styles.listItemTitle}>EDIT</Text>
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
  },
  listItem: {
    padding: 15,
    backgroundColor: 'snow',
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

export default WorkHourItem;
