import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
  StatusBar
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <App />
      </Provider>
    </GestureHandlerRootView>

  )
}

export default AppWrapper;
