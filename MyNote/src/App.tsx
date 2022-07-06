import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
  StatusBar
} from 'react-native';
import { Provider } from 'react-redux';
import { useAppSelector } from './app/hook';
import { store } from './app/store';
import AuthStack from './navigation/AuthStack';
import MainStack from './navigation/MainStack';

const App = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  return (
    <NavigationContainer>
      <StatusBar barStyle="default" />
      {!isLoggedIn ? <AuthStack /> : <MainStack />}
    </NavigationContainer>
  );
};

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default AppWrapper;
