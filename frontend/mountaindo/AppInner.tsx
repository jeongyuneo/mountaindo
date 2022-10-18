import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {RootState} from './src/store/reducer';
import Main from './src/pages/Main';
import Hiking from './src/pages/hiking/Hiking';
import Mountain from './src/pages/mountain/Mountain';
import MountainDetail from './src/pages/mountain/MountainDetail';
import Completed from './src/pages/completed/Completed';
import MyPage from './src/pages/user/loggedIn/MyPage';
import Agreement from './src/pages/user/loggedOut/Agreement';
import Welcome from './src/pages/user/loggedOut/Welcome';
import FindId from './src/pages/user/loggedOut/FindId';
import NicknameChangeForm from './src/pages/user/loggedIn/NicknameChangeForm';
import usePermissions from './src/hooks/usePermissions';
import SignIn from './src/pages/user/loggedOut/SignIn';
import FindPassword from './src/pages/user/loggedOut/FindPassword';
import Survey1 from './src/pages/user/loggedOut/Survey1';
import Survey2 from './src/pages/user/loggedOut/Survey2';
import Survey3 from './src/pages/user/loggedOut/Survey3';
import Survey4 from './src/pages/user/loggedOut/Survey4';
import PasswordChange from './src/pages/user/loggedIn/PasswordChange';
import PhoneNumberChangeForm from './src/pages/user/loggedIn/PhoneNumberChangeForm';
import UserInfoChange from './src/pages/user/loggedIn/UserInfoChange';
import SignUp from './src/pages/user/loggedOut/SignUp';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Visited from './src/pages/completed/Visited';
import AddressChangeForm from './src/pages/user/loggedIn/AddressChangeForm';
import CourseDetail from './src/pages/mountain/CourseDetail';
import {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faMountain,
  faPersonHiking,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {faFlag} from '@fortawesome/free-regular-svg-icons';
import FindMountain from './src/pages/hiking/FindMountain';
import {Dimensions, StyleSheet, View} from 'react-native';
import {LoadingAnimationB} from './src/components/completed/LoadingAnimation';

export type LoggedInParamList = {
  Welcome: any;
  Survey1: any;
  Survey2: any;
  Survey3: any;
  Survey4: any;
  홈: any;
  Completed: any;
  등산: any;
  산: any;
  UserInfoChange: any;
  PasswordChange: any;
  NicknameChangeForm: any;
  PhoneNumberChangeForm: any;
  유저: any;
  CourseDetail: any;
  기록: any;
  AddressChangeForm: any;
  FindMountain: any;
  MountainDetail: any;
};

export type RootStackParamList = {
  SignIn: any;
  Agreement: any;
  SignUp: any;
  FindId: any;
  FindPassword: any;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Top = createMaterialTopTabNavigator();

// 방문한 산의 top tab
function TopTab() {
  return (
    <Top.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: '#D3D3D3',
        tabBarIndicatorStyle: {
          backgroundColor: '#57d696',
        },
      }}>
      <Top.Screen
        name="Completed"
        component={Completed}
        options={{title: '완등한 산'}}
      />
      <Top.Screen
        name="기록"
        component={Visited}
        options={{title: '등산 기록'}}
      />
    </Top.Navigator>
  );
}

// 유저 관련 bottom tab에 연결되는 페이지
function UserTab() {
  return (
    <Stack.Navigator
      screenOptions={({navigation}) => ({
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'NanumBarunGothic',
          fontSize: 15,
        },
        headerShadowVisible: false,
      })}>
      <Stack.Screen
        name="유저"
        component={MyPage}
        options={{title: '프로필'}}
      />
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
      <Stack.Screen
        name="AddressChangeForm"
        component={AddressChangeForm}
        options={{title: '주소 변경'}}
      />
    </Stack.Navigator>
  );
}

// 산 bottom tab에 연결되는 페이지
function MountainTab() {
  return (
    <Stack.Navigator
      screenOptions={({navigation}) => ({
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'NanumBarunGothic',
          fontSize: 15,
        },
        headerShadowVisible: false,
      })}>
      <Stack.Screen
        name="산"
        component={Mountain}
        options={{title: '전체 산 목록', headerShown: false}}
      />
      <Stack.Screen
        name="MountainDetail"
        component={MountainDetail}
        options={{title: '산 상세 정보', headerShown: false}}
      />
      <Stack.Screen
        name="CourseDetail"
        component={CourseDetail}
        options={{title: '코스 상세 정보', headerShown: false}}
      />
    </Stack.Navigator>
  );
}

// 홈 탭 (메인, 산 상세)
function HomeTab() {
  return (
    <Stack.Navigator
      screenOptions={({navigation}) => ({
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'NanumBarunGothic',
          fontSize: 15,
        },
        headerShadowVisible: false,
      })}>
      <Stack.Screen name="홈" component={Main} options={{headerShown: false}} />
      <Stack.Screen
        name="MountainDetail"
        component={MountainDetail}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

// 방문한 산 bottom tab에 연결되는 페이지
function VisitedTab() {
  return (
    <Stack.Navigator
      screenOptions={({navigation}) => ({
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'NanumBarunGothic',
          fontSize: 15,
        },
        headerShadowVisible: false,
      })}>
      <Stack.Screen
        name="Complete"
        component={TopTab}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function HikingTab() {
  return (
    <Stack.Navigator
      screenOptions={({navigation}) => ({
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'NanumBarunGothic',
          fontSize: 15,
        },
        headerShadowVisible: false,
      })}>
      <Stack.Screen
        name="FindMountain"
        component={FindMountain}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="등산"
        component={Hiking}
        options={{
          title: '등산',
          headerTitleStyle: {
            fontFamily: 'NanumBarunGothic',
          },
        }}
      />
    </Stack.Navigator>
  );
}

function AppInner() {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn); // 로그인 여부 확인
  const isSurveyed = useSelector((state: RootState) => state.user.isSurveyed); // 설문조사 여부 확인

  // 앱 로딩이 종료되면 splash screen 종료
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  // 앱에 접속할 때마다 사용자의 권한 확인
  usePermissions();

  // isLoggedIn && isSurveyed면 기본 bottom tab에 연결된 화면 렌더링
  // isLoggedIn && !isSurveyed면 설문조사 화면 렌더링
  // 그 외엔 로그인 전에 접속할 수 있는 페이지 렌더링
  const [isTimeOut, setIsTimeOut] = useState(true);
  // 타이머 시작 함수
  const handleStart = () => {
    setTimeout(() => {
      setIsTimeOut(false);
    }, 1000);
  };

  if (isLoggedIn) {
    handleStart();
  }

  return isLoggedIn && isSurveyed ? (
    isTimeOut ? (
      <View style={styles.loading}>
        <LoadingAnimationB />
      </View>
    ) : (
      <Tab.Navigator
        screenOptions={{
          tabBarInactiveTintColor: 'black',
          tabBarActiveTintColor: 'black',
          tabBarStyle: {
            position: 'absolute',
          },
          tabBarHideOnKeyboard: true,
          unmountOnBlur: true,
        }}
        initialRouteName="홈">
        <Tab.Screen
          name="산"
          component={MountainTab}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <FontAwesomeIcon
                icon={faMountain}
                size={20}
                color={focused ? '#57d696' : 'black'}
              />
            ),
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="등산"
          component={HikingTab}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <FontAwesomeIcon
                icon={faPersonHiking}
                size={20}
                color={focused ? '#57d696' : 'black'}
              />
            ),
            unmountOnBlur: false,
          }}
        />
        <Tab.Screen
          name="홈"
          component={HomeTab}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <FontAwesomeIcon
                icon={faHome}
                size={20}
                color={focused ? '#57d696' : 'black'}
              />
            ),
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="기록"
          component={VisitedTab}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <FontAwesomeIcon
                icon={faFlag}
                size={20}
                color={focused ? '#57d696' : 'black'}
              />
            ),
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="유저"
          component={UserTab}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <FontAwesomeIcon
                icon={faUser}
                size={20}
                color={focused ? '#57d696' : 'black'}
              />
            ),
            unmountOnBlur: true,
          }}
        />
      </Tab.Navigator>
    )
  ) : isLoggedIn && !isSurveyed ? (
    <Stack.Navigator>
      <Stack.Group screenOptions={{headerShown: false}}>
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
      </Stack.Group>
    </Stack.Navigator>
  ) : (
    <Stack.Navigator
      screenOptions={({navigation}) => ({
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'NanumBarunGothic',
          fontSize: 15,
        },
        headerShadowVisible: false,
      })}>
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{title: '로그인'}}
        />
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
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    width: 200,
    height: 200,
    top: 150,
    borderRadius: 50,
    overflow: 'hidden',
    left: Dimensions.get('window').width / 2 - 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default AppInner;
