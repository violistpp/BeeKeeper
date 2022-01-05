import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const WorkHourItem = ({item, editItem}) => {
  return (
    <View style={styles.container}>
      <View style={styles.listItem}>
        <View style={styles.listItemView}>
          <Text style={styles.listItemTitle}>{item.title}</Text>
          <Text style={styles.listItemTitle}>{item.interval}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.listItem} onPress={() => editItem(item)}>
        <View
          style={[
            styles.listItemView,
            {
              borderColor: 'goldenrod',
              borderWidth: 2,
              borderRadius: 15,
              padding: 5,
              paddingRight: 20,
              marginRight: -30,
            },
          ]}>
          <Text style={styles.listItemTitle}>RENAME</Text>
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
    justifyContent: 'space-between',
  },
  listItemTitle: {
    fontSize: 18,
  },
});

export default WorkHourItem;
