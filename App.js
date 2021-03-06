
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SignInScreen from "./screen/Login"
import TabBottom from "./navigate/tabBottom"
import ItemChat from "./screen/ItemChat"
import CallVideo from "./screen/CallVideo"
import Profile from "./screen/Profile"
import firestore, { firebase } from '@react-native-firebase/firestore';
import '@react-native-firebase/firestore';
const Stack = createNativeStackNavigator();
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyBZkh8nkvgcv6HUWCftIJPkuSZANMvlVLU",
    authDomain: "tathuheo.firebaseapp.com",
    databaseURL: "https://tathuheo-default-rtdb.firebaseio.com",
    projectId: "tathuheo",
    storageBucket: "tathuheo.appspot.com",
    messagingSenderId: "65211879809",
    appId: "1:277423826521:android:baf9811bf6ad9c4cd9f348",
    measurementId: "277423826521"
  })
}
// firebase.app().firestore()



export default function App() {

  
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <React.Fragment>
            <Stack.Screen name="ListUser" component={TabBottom} />
            <Stack.Screen name="ItemChat" component={ItemChat} />
            <Stack.Screen name="Profile" component={Profile} />
          </React.Fragment>

        </Stack.Navigator>
        <CallVideo />
      </NavigationContainer>
  );
}
