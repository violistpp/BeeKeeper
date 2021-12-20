import React, {useState, useContext, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';
import {UserContext} from '../hooks/UserContext';
import {Notifier, Easing, NotifierComponents} from 'react-native-notifier';

const LoginScreen = () => {
  // States
  const [username, setUsername] = useState('test@test.lt');
  const [password, setPassword] = useState('testest');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [loginButtontext, setLoginButtontext] = useState('LOGIN');
  const [isSignIn, setIsSignIn] = useState(true);
  // Animated variable
  const regLogTransliation = useRef(new Animated.Value(1)).current;
  // Context
  const {signIn, signUp} = useContext(UserContext);

  // Buttons movement
  function moveBackButton() {
    setTimeout(() => setLoginButtontext(isSignIn ? 'CREATE' : 'LOGIN'), 400);
    Animated.timing(regLogTransliation, {
      toValue: isSignIn ? 0 : 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }

  // Notification
  const showNotification = () => {
    Notifier.showNotification({
      title: 'John Doe',
      description: 'Hello! Can you help me with notifications?',
      duration: 10000,
      showAnimationDuration: 800,
      showEasing: Easing.bounce,
      Component: NotifierComponents.Alert,
      componentProps: {
        alertType: 'warn',
      },
    });
  };

  return (
    <View style={styles.container}>
      {/* <Message message="Hello World" /> */}
      <View style={{justifyContent: 'center', paddingVertical: 50, height: 80}}>
        <Animated.View
          style={{
            transform: [
              {
                translateX: regLogTransliation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-150, -310],
                }),
              },
            ],
          }}>
          <TouchableOpacity
            style={[styles.buttonStyle, styles.backButton]}
            onPress={() => {
              setIsSignIn(true);
              moveBackButton();
            }}>
            <Text style={styles.buttonText}>BACK TO LOGIN</Text>
          </TouchableOpacity>
        </Animated.View>
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
        <Animated.View
          style={{
            flex: 3,
            transform: [
              {
                translateX: regLogTransliation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-310, 0],
                }),
              },
            ],
          }}>
          <TouchableOpacity
            style={[styles.buttonStyle, styles.registrateButtom]}
            onPress={() => {
              setIsSignIn(false);
              moveBackButton();
              showNotification();
            }}>
            <Text style={styles.buttonText}>REGISTRATE</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={{
            flex: 2,
            transform: [
              {
                translateX: regLogTransliation.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, 200, 0],
                }),
              },
            ],
          }}>
          <TouchableOpacity
            style={[styles.buttonStyle, styles.loginButton]}
            onPress={() =>
              isSignIn
                ? signIn({username, password})
                : signUp({username, password})
            }>
            <Text style={styles.buttonText}>{loginButtontext}</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default LoginScreen;

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
    paddingLeft: 60,
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
