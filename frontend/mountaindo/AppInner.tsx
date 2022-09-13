import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {RootState} from './src/store/reducer';

import Main from './src/pages/Main';
import Hiking from './src/pages/Hiking';
import Mountain from './src/pages/Mountain';
import Completed from './src/pages/Completed';

// import SignIn from './src/pages/SignIn';
// import SignUp from './src/pages/SignUp';

export type LoggedInParamList = {
  Main: undefined;
  Completed: undefined;
  Hiking: undefined;
  Mountain: undefined;
};

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

function AppInner() {
  const isLoggedIn = useSelector((state: RootState) => !!state.user.email);
  console.log('isLoggedIn', isLoggedIn);

  return (
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
  );
}

export default AppInner;
