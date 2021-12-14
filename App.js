import React, {useState, useMemo, useEffect, useReducer} from 'react';
// import {View, Text, Button} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import ProjectListScreen from './src/screens/ProjectListScreen';
// import DetailsScreen from './src/screens/DetailsScreen';
import TaskScreen from './src/screens/TaskScreen';
import ProjectScreen from './src/screens/ProjectScreen';
import LoginScreen from './src/screens/LoginScreen';
import SplashScreen from './src/screens/SplashScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {UserContext} from './src/hooks/UserContext';
import auth from '@react-native-firebase/auth';
// import * as SecureStore from 'expo-secure-store';
// import Message from './src/components/Message';

const Stack = createNativeStackNavigator();

// async function save(key, value) {
//   await SecureStore.setItemAsync(key, value);
// }

// async function getValueFor(key) {
//   let result = await SecureStore.getItemAsync(key);
//   if (result) {
//     alert("🔐 Here's your value 🔐 \n" + result);
//   } else {
//     alert('No values stored under that key' + key + '.');
//   }
// }

const App = () => {
  const [key, onChangeKey] = useState('userToken');
  const [value, onChangeValue] = useState('');
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );
  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        // userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);
  const authContext = useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token
        auth()
          .signInWithEmailAndPassword(data.username, data.password)
          .then(userCredential => {
            auth()
              .currentUser.getIdToken(true)
              .then(function (idToken) {
                // save('userToken', idToken);
                console.log(idToken);
                dispatch({
                  type: 'SIGN_IN',
                  token: idToken,
                });
              })
              .catch(function (error) {
                // Handle error
              });
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              console.log('That email address is already in use!');
            }
            if (error.code === 'auth/invalid-email') {
              console.log('That email address is invalid!');
            }
            console.error(error);
          });
      },
      signOut: () => {

        dispatch({type: 'SIGN_OUT'});
      },
      signUp: async data => {
        auth()
          .createUserWithEmailAndPassword(data.username, data.password)
          .then(userCredential => {
            console.log(userCredential.user.getIdToken());
            dispatch({
              type: 'SIGN_IN',
              token: userCredential.user.getIdToken(),
            });
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              console.log('That email address is already in use!');
            }
            if (error.code === 'auth/invalid-email') {
              console.log('That email address is invalid!');
            }
            console.error(error);
          });
      },
    }),
    [],
  );

  return (
    <UserContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name="SignIn"
              component={LoginScreen}
              options={{
                title: 'Sign in',
                // When logging out, a pop animation feels intuitive
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                headerShown: false,
              }}
            />
          ) : (
            // User is signed in
            <>
              <Stack.Screen
                name="Project List"
                component={ProjectListScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Project"
                component={ProjectScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Task"
                component={TaskScreen}
                options={{headerShown: false}}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default App;
