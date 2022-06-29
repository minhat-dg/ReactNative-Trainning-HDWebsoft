import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  StatusBar
} from 'react-native';
import { Provider } from 'react-redux';
import { store } from './app/store';
import AuthStack from './navigation/AuthStack';
import MainStack from './navigation/MainStack';

const App = () => {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        {!user ? <AuthStack /> : <MainStack />}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
