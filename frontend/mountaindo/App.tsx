import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/store';
import AppInner from './AppInner';
import {useState} from 'react';
import SignIn from './src/pages/SignIn';

export type RootStackParamList = {
  SignIn: any;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Provider store={store}>
      <NavigationContainer>
        {isLoggedIn ? <AppInner /> : <SignIn />}
      </NavigationContainer>
    </Provider>
  );
}

export default App;
