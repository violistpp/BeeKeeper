import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {UserContext} from '../hooks/UserContext';

const SignInScreen = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const {signIn} = React.useContext(UserContext);

  const {container, inputView, textInput, forgotButton, loginButton} = styles;

  return (
    <View style={container}>
      <View style={inputView}>
        <TextInput
          style={textInput}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={inputView}>
        <TextInput
          style={textInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      
      <TouchableOpacity>
        <Text style={forgotButton}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* <Button title="Sign in"  /> */}
      <TouchableOpacity
        style={loginButton}
        onPress={() => signIn({username, password})}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2FEDC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    backgroundColor: '#fff',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
  },
  textInput: {
    height: 50,
    flex: 1,
    padding: 10,
    paddingHorizontal: 20,
  },
  forgotButton: {
    height: 30,
    marginBottom: 30,
  },
  loginButton: {
    width: '50%',
    marginLeft: 250,
    paddingLeft: 30,
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#E7E75A',
  },
});
