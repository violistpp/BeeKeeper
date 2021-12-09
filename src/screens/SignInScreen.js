import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {UserContext} from '../hooks/UserContext';

const SignInScreen = () => {
  const [username, setUsername] = React.useState('test@test.lt');
  const [password, setPassword] = React.useState('testest');
  const [repeatPassword, setRepeatPassword] = React.useState('');
  const [isSignIn, setIsSignIn] = React.useState(true);

  const {signIn, signUp} = React.useContext(UserContext);

  return (
    <View style={styles.container}>
      <View style={{justifyContent: 'center', paddingVertical: 50, height: 80}}>
        {isSignIn ? (
          <View />
        ) : (
          <TouchableOpacity
            style={[styles.buttonStyle, styles.backButton]}
            onPress={() => setIsSignIn(true)}>
            <Text style={styles.buttonText}>BACK TO LOGIN</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.headerText}>
        {isSignIn ? 'LOGIN' : 'REGISTRATION'}
      </Text>
      <View style={styles.inputTextContainer}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>
        {isSignIn ? (
          <View style={{height: 45}}>
            <TouchableOpacity>
              <Text>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.inputView}>
            <TextInput
              style={styles.textInput}
              placeholder="Repeat password"
              value={repeatPassword}
              onChangeText={setRepeatPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <View style={{flex: 1}}></View>
        <View style={{flex: 3}}>
          <TouchableOpacity
            style={[styles.buttonStyle, styles.registrateButtom]}
            onPress={() => setIsSignIn(false)}>
            <Text style={styles.buttonText}>REGISTRATE</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 2}}>
          <TouchableOpacity
            style={[styles.buttonStyle, styles.loginButton]}
            onPress={() => signIn({username, password})}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'oldlace',
    alignItems: 'center',
  },
  headerText: {
    paddingVertical: 60,
    fontSize: 24,
    textAlign: 'center',
    color: 'darkgrey',
    fontWeight: 'bold',
  },
  inputTextContainer: {
    alignItems: 'center',
    height: 240,
    width: '100%',
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
    color: 'darkgrey',
  },
  buttonContainer: {
    flexDirection: 'row',
    height: 60,
    marginTop: 40,
  },
  registrateButtom: {
    backgroundColor: 'goldenrod',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: 'darkgrey', // darkseagreen, lightblue
    marginRight: -40,
    marginLeft: 15,
  },
  backButton: {
    backgroundColor: 'darkgrey', // darkseagreen, lightblue
    marginLeft: -160,
    paddingLeft: 60,
    marginRight: 120,
  },
  buttonStyle: {
    paddingHorizontal: 30,
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'oldlace',
  },
});
