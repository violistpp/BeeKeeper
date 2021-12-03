import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const Header = ({title}) => {
  return (
    <View style={styles.headerRow}>
      {/* <TouchableOpacity onPress={() => {}}>
        <Text style={styles.optionLeft}>{'<'}</Text>
      </TouchableOpacity> */}
      <Text style={styles.titleText}>{title}</Text>
      {/* <TouchableOpacity>
        <Text style={styles.optionRight}>+</Text>
      </TouchableOpacity> */}
    </View>
  );
};

Header.defaultProps = {
  title: 'Title',
};

const styles = StyleSheet.create({
  headerRow: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
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
