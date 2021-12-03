import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const ButtonHexagon = ({toggle, isActive}) => {
  return (
    <TouchableOpacity onPress={() => toggle()}>
      <View style={styles.hexagon}>
        <View style={styles.hexagonInner}>
          <Text style={styles.timerText}>{isActive ? 'Stop' : 'Start'}</Text>
        </View>
        <View style={styles.hexagonBefore} />
        <View style={styles.hexagonAfter} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  hexagon: {
    width: 80,
    height: 43.99,
  },
  hexagonInner: {
    width: 80,
    height: 44,
    backgroundColor: 'goldenrod',
    alignItems: 'center',
  },
  hexagonBefore: {
    position: 'absolute',
    top: -20,
    left: 0,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 40,
    borderLeftColor: 'transparent',
    borderRightWidth: 40,
    borderRightColor: 'transparent',
    borderBottomWidth: 20,
    borderBottomColor: 'goldenrod',
  },
  hexagonAfter: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 40,
    borderLeftColor: 'transparent',
    borderRightWidth: 40,
    borderRightColor: 'transparent',
    borderTopWidth: 20,
    borderTopColor: 'goldenrod',
  },
  timerText: {
    position: 'absolute',
    color: 'white',
    fontSize: 30,
  },
});

export default ButtonHexagon;
