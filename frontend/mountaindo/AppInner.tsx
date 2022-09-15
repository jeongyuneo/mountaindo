import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {RootState} from './src/store/reducer';

import Main from './src/pages/Main';
import Hiking from './src/pages/Hiking';
import Mountain from './src/pages/Mountain';
import Completed from './src/pages/Completed';

import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import FindId from './src/pages/FindId';
import FindPassword from './src/pages/FindPassword';
import PasswordChange from './src/pages/PasswordChange';
import UserInfoChange from './src/pages/UserInfoChange';
import NicknameChangeForm from './src/pages/NicknameChangeForm';
import PhoneNumberChangeForm from './src/pages/PhoneNumberChangeForm';

export type LoggedInParamList = {
  Main: any;
  Completed: any;
  Hiking: any;
  Mountain: any;
  UserInfoChange: any;
  PasswordChange: any;
  NicknameChangeForm: any;
  PhoneNumberChangeForm: any;
};

export type RootStackParamList = {
  SignIn: any;
  SignUp: any;
  FindId: any;
  FindPassword: any;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTab() {
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

function AppInner() {
  const isLoggedIn = useSelector((state: RootState) => !!state.user.email);

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Group screenOptions={{headerShown: false}}>
            <Stack.Screen name="BottomTab" component={BottomTab} />
          </Stack.Group>
          <Stack.Group>
            <Stack.Screen
              name="UserInfoChange"
              component={UserInfoChange}
              options={{title: '개인 정보 수정'}}
            />
            <Stack.Screen
              name="PasswordChange"
              component={PasswordChange}
              options={{title: '비밀번호 변경'}}
            />
            <Stack.Screen
              name="NicknameChangeForm"
              component={NicknameChangeForm}
              options={{title: '닉네임 변경'}}
            />
            <Stack.Screen
              name="PhoneNumberChangeForm"
              component={PhoneNumberChangeForm}
              options={{title: '전화번호 변경'}}
            />
          </Stack.Group>
        </>
      ) : (
        <>
          <Stack.Group screenOptions={{headerShown: false}}>
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{title: '로그인'}}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{title: '회원가입'}}
            />
          </Stack.Group>
          <Stack.Group>
            <Stack.Screen
              name="FindId"
              component={FindId}
              options={{title: '아이디찾기'}}
            />
            <Stack.Screen
              name="FindPassword"
              component={FindPassword}
              options={{title: '비밀번호찾기'}}
            />
          </Stack.Group>
        </>
      )}
    </Stack.Navigator>
  );
}

export default AppInner;
