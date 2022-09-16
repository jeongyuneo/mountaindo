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
import Survey2 from './src/pages/Survey2';
import Survey3 from './src/pages/Survey3';
import Survey4 from './src/pages/Survey4';
import Survey5 from './src/pages/Survey5';

export type LoggedInParamList = {
  Main: any;
  Completed: any;
  Hiking: any;
  Mountain: any;
};

export type RootStackParamList = {
  SignUp: any;
  Welcome: any;
  Survey1: any;
  Survey2: any;
  Survey3: any;
  Survey4: any;
  Survey5: any;
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
          <Stack.Screen
            name="Survey2"
            component={Survey2}
            options={{title: '설문조사2'}}
          />
          <Stack.Screen
            name="Survey3"
            component={Survey3}
            options={{title: '설문조사3'}}
          />
          <Stack.Screen
            name="Survey4"
            component={Survey4}
            options={{title: '설문조사4'}}
          />
          <Stack.Screen
            name="Survey5"
            component={Survey5}
            options={{title: '설문조사5'}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default AppInner;
