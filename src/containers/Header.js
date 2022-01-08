import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = item => {
  console.log(item);
  return (
    <View style={styles.headerRow}>
      {item.leftFn ? (
        <TouchableOpacity onPress={() => item.leftFn()}>
          <Icon name="left" size={30} color="snow" />
        </TouchableOpacity>
      ) : (
        <View style={{margin: 15}} />
      )}
      <Text style={styles.titleText}>{item.title}</Text>
      {item.rightFn ? (
        <TouchableOpacity onPress={() => item.rightFn()}>
          <Icon2 name="barcode-scan" size={30} color="snow" />
        </TouchableOpacity>
      ) : (
        <View style={{margin: 15}} />
      )}
    </View>
  );
};

Header.defaultProps = {
  title: 'Title',
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 60,
    padding: 15,
    backgroundColor: 'goldenrod',
  },
  titleText: {
    color: '#fff',
    fontSize: 23,
    textAlign: 'center',
  },
  optionLeft: {
    color: '#fff',
    fontSize: 23,
    paddingHorizontal: 15,
  },
  optionRight: {
    color: '#fff',
    fontSize: 23,
    paddingHorizontal: 15,
  },
});

export default Header;
