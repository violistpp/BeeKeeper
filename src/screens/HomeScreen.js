import React, {useContext} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {UserContext} from '../hooks/UserContext';

const HomeScreen = () => {
  const {signOut} = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="Go to Details" onPress={signOut} />
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

export default HomeScreen;
