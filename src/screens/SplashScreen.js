import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="#000" size="large" />
      <Text style={styles.loadingText}>Loading</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#000',
  },
});
