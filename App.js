import React, {useMemo, useEffect, useReducer} from 'react';
import ProjectListScreen from './src/screens/ProjectListScreen';
import TaskScreen from './src/screens/TaskScreen';
import ProjectScreen from './src/screens/ProjectScreen';
import LoginScreen from './src/screens/LoginScreen';
import SplashScreen from './src/screens/SplashScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {UserContext} from './src/hooks/UserContext';
import auth from '@react-native-firebase/auth';
import {
  NotifierWrapper,
  Notifier,
  Easing,
  NotifierComponents,
} from 'react-native-notifier';
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import showNotification from './src/utils/ShowNotification';

const Stack = createNativeStackNavigator();

const App = () => {
  const showNotification = item => {
    Notifier.showNotification({
      title: item.title,
      description: item.text,
      duration: 10000,
      showAnimationDuration: 800,
      showEasing: Easing.bounce,
      Component: NotifierComponents.Alert,
      componentProps: {
        alertType: 'warn',
      },
    });
  };

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('userIdToken', value);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userIdToken');
      if (value !== null) {
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  };

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
            isLoading: false,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            isLoading: false,
          };
        case 'LOADING':
          return {
            ...prevState,
            isLoading: true,
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
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        // userToken = await SecureStore.getItemAsync('userToken');
        if (getData('userIdToken')) {
          userToken = getData('userIdToken');
        }
      } catch (e) {
        // Restoring token failed
      }
      dispatch({
        type: 'RESTORE_TOKEN',
        token: userToken,
      });
    };

    bootstrapAsync();
  }, []);
  const authContext = useMemo(
    () => ({
      signIn: async data => {
        dispatch({type: 'LOADING'});
        auth()
          .signInWithEmailAndPassword(data.username, data.password)
          .then((userCredential) => {
            auth()
              .currentUser.getIdToken(true)
              .then(function (idToken) {
                storeData(idToken);
                dispatch({
                  type: 'SIGN_IN',
                  token: idToken,
                });
              })
              .catch(function (error) {
                showNotification({
                  title: 'error',
                  text: 'Some error',
                  type: 'error',
                });
                dispatch({type: 'SIGN_OUT'});
              });
          })
          .catch(error => {
            if (error.code === 'auth/invalid-email') {
              showNotification({
                title: 'Blogi prisijungimo duomenys',
                text: 'Prisijungimo el.paštas neteisingai įvestas',
                type: 'warm',
              });
              dispatch({type: 'SIGN_OUT'});
            }
            showNotification({
              title: 'Blogi prisijungimo duomenys',
              text: 'Patikrintike, ar visį duomenys yra teisingai įvestos',
              type: 'warm',
            });
            dispatch({type: 'SIGN_OUT'});
          });
      },
      signOut: () => {
        storeData(null);
        dispatch({type: 'SIGN_OUT'});
      },
      signUp: async data => {
        auth()
          .createUserWithEmailAndPassword(data.username, data.password)
          .then(userCredential => {
            dispatch({
              type: 'SIGN_IN',
              token: userCredential.user.getIdToken(),
            });
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              showNotification({
                title: 'Blogi prisijungimo duomenys',
                text: 'Prisijungimo el.paštas yra jau užimtas. Įveskite kitą el.paštą ir bandykite darb karta',
                type: 'warm',
              });
              dispatch({type: 'SIGN_OUT'});
            }
            if (error.code === 'auth/invalid-email') {
              showNotification({
                title: 'Blogi prisijungimo duomenys',
                text: 'Prisijungimo el.paštas yra neteisingas.',
                type: 'warm',
              });
              dispatch({type: 'SIGN_OUT'});
            }
            showNotification({
              title: 'error',
              text: '',
              type: 'error',
            });
            dispatch({type: 'SIGN_OUT'});
          });
      },
    }),
    [],
  );

  return (
    <UserContext.Provider value={authContext}>
      <NavigationContainer>
        <NotifierWrapper>
          <Stack.Navigator>
            {state.isLoading ? (
              <Stack.Screen
                name="Splash"
                component={SplashScreen}
                options={{headerShown: false}}
              />
            ) : state.userToken == null ? (
              <Stack.Screen
                name="SignIn"
                component={LoginScreen}
                options={{
                  title: 'Sign in',
                  animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                  headerShown: false,
                }}
              />
            ) : (
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
        </NotifierWrapper>
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default App;
