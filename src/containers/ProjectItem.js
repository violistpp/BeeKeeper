import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

const ProjectItem = ({navigation, item, editItem, deleteItem}) => {
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
      <View style={styles.buttonsLine}>
        <TouchableOpacity onPress={() => editItem(item)}>
          <View style={[styles.editButton, {marginRight: 5}]}>
            <Icon name="edit" size={25} color="snow" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteItem(item.id)}>
          <View style={styles.removeButton}>
            <Icon2 name="close" size={25} color="snow" />
          </View>
        </TouchableOpacity>
      </View>
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
    flex: 1,
    backgroundColor: 'snow', //floralwhite
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
  editButton: {
    padding: 10,
    backgroundColor: 'goldenrod',
    borderRadius: 30,
  },
  removeButton: {
    padding: 10,
    backgroundColor: 'darkgrey',
    paddingRight: 35,
    marginRight: -30,
    borderRadius: 30,
  },
  buttonsLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
});

export default ProjectItem;
