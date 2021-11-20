import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const TaskScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Task Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TaskScreen;
