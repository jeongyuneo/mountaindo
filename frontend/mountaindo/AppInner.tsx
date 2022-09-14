import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Main from './src/pages/Main';
import Hiking from './src/pages/Hiking';
import Mountain from './src/pages/Mountain';
import Completed from './src/pages/Completed';

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

function AppInner() {
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
