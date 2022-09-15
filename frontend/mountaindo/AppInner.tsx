import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {RootState} from './src/store/reducer';

import Main from './src/pages/Main';
import Hiking from './src/pages/Hiking';
import Mountain from './src/pages/Mountain';
import Completed from './src/pages/Completed';
import {NavigationContainer} from '@react-navigation/native';

import SignUp from './src/pages/SignUp';
import Agreement from './src/pages/Agreement';
import Welcome from './src/pages/Welcome';
import Survey1 from './src/pages/Survey1';

export type LoggedInParamList = {
  Main: undefined;
  Completed: undefined;
  Hiking: undefined;
  Mountain: undefined;
};

export type RootStackParamList = {
  SignUp: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AppInner() {
  const isLoggedIn = useSelector((state: RootState) => !!state.user.email);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator>
          <Tab.Screen name="Main" component={Main} options={{title: 'Main'}} />
          <Tab.Screen
            name="Hiking"
            component={Hiking}
            options={{title: ' Hiking'}}
          />
          <Tab.Screen
            name="Mountain"
            component={Mountain}
            options={{title: 'Mountain'}}
          />
          <Tab.Screen
            name="Completed"
            component={Completed}
            options={{title: 'Completed'}}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="Agreement"
            component={Agreement}
            options={{title: '약관동의서'}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{title: '회원가입'}}
          />
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{title: '가입환영'}}
          />
          <Stack.Screen
            name="Survey1"
            component={Survey1}
            options={{title: '설문조사1'}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default AppInner;
