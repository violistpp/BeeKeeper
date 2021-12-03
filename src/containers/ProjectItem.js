import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const ProjectItem = ({navigation, item, deleteItem}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.listItem}
        onPress={() =>
          navigation.navigate('Project', {
            item: {item},
          })
        }>
        <View style={styles.listItemView}>
          <Text style={styles.listItemTitle}>{item.title}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => deleteItem(item.id)}>
        <View style={styles.listItemView}>
          <Text style={styles.listItemTitle}>Delete</Text>
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
    borderColor: 'gainsboro',
    borderWidth: 1,
  },
  listItem: {
    backgroundColor: 'aliceblue', //#f8f8f8
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  listItemView: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemTitle: {
    fontSize: 18,
  },
});

export default ProjectItem;
