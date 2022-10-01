// react import
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

// fontawesom import
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCamera} from '@fortawesome/free-solid-svg-icons';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';

// component import
import {LoggedInParamList} from '../../../../AppInner';
import {useAppDispatch} from '../../../store';
import userSlice, {userChange, userInfo} from '../../../slices/userSlice/user';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// Navigation 사용
type MyPageScreenProps = NativeStackScreenProps<LoggedInParamList, 'MyPage'>;
function MyPage({navigation}: MyPageScreenProps) {
  const dispatch = useAppDispatch();
  const [photo, setPhoto] = useState(''); //이미지 접근을 위한 State
  // 유저 정보를 담기 위한 State
  const [user, setUser] = useState({
    si: '',
    gu: '',
    dong: '',
    fullAddress: '',
    birth: '',
    email: '',
    name: '',
    nickname: '',
    phone: '',
    imageUrl: '',
  });
  //로그아웃 버튼 클릭시 로그인창으로 화면전환
  const loggedout = () => {
    dispatch(userSlice.actions.setLogout(false));
  };
  // 유저정보를 받아오는 기능.
  useEffect(() => {
    dispatch(userInfo('a')).then(async res => {
      const si = res.payload?.address.split(' ');
      setUser({
        si: si[0],
        gu: si[1],
        dong: si[2],
        fullAddress: res.payload?.address,
        birth: res.payload?.birth,
        email: res.payload?.email,
        name: res.payload?.name,
        nickname: res.payload?.nickname,
        phone: res.payload?.phone,
        imageUrl: res.payload?.imageUrl,
      });
    });
  }, [user.nickname, user.imageUrl, photo]);

  // 이미지 불러오기
  const showPicker = async () => {
    const grantedcamera = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'App Camera Permission',
        message: 'App neds access to your camera',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    const grantedstorage = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'App Camera Permission',
        message: 'App neds access to your camera',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (
      grantedcamera === PermissionsAndroid.RESULTS.GRANTED &&
      grantedstorage === PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('Camera & storage permission given');
      Alert.alert(
        '프로필',
        '프로필 사진 변경하기',
        [
          {
            text: '사진 촬영',
            onPress: async () => {
              const result = await launchCamera({
                mediaType: 'photo',
                cameraType: 'back',
              });
              if (result.didCancel) {
                return null;
              }
              const localUri = result.assets[0].uri;
              const uriPath = localUri?.split('//').pop();
              const imageName = localUri?.split('/').pop();

              dispatch(
                userChange({user: {...user, imageUrl: 'file://' + localUri}}),
              ).then(res => {
                if (res.meta.requestStatus === 'fulfilled') {
                  setPhoto('file://' + localUri);
                }
              });
            },
          },
          {
            text: '갤러리',
            onPress: async () => {
              const result = await launchImageLibrary();
              if (result.didCancel) {
                return null;
              }
              const localUri = result.assets[0].uri;
              const uriPath = localUri?.split('//').pop();
              const imageName = localUri?.split('/').pop();

              dispatch(
                userChange({user: {...user, imageUrl: 'file://' + localUri}}),
              ).then(res => {
                if (res.meta.requestStatus === 'fulfilled') {
                  setPhoto('file://' + localUri);
                }
              });
            },
          },
        ],
        {cancelable: true},
      );
    } else {
      console.log('Camera permission denied');
    }
  };
  // 이미지 불러오기 종료

  return (
    <View style={styles.container}>
      <View style={styles.containerUp}>
        <View style={styles.containerDown}>
          <View style={styles.userInfo}>
            {user.imageUrl !== null ? (
              <Image source={{uri: user.imageUrl}} style={styles.userImg} />
            ) : (
              <Image
                source={require('../../../assets/jjang.png')}
                style={styles.userImg}
              />
            )}
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.userName}>{user.nickname} 님</Text>
              <Pressable onPress={showPicker}>
                <FontAwesomeIcon
                  icon={faCamera}
                  size={12}
                  style={styles.camera}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.containerBottom}>
        <View>
          <ScrollView>
            <Pressable
              onPress={() => navigation.push('UserInfoChange', {user, setUser})}
              style={styles.menuHeight}>
              <View style={styles.menuStyle}>
                <Text style={styles.goMenuText}>개인 정보 수정</Text>
                <FontAwesomeIcon
                  icon={faAngleRight}
                  size={20}
                  style={styles.angleIcon}
                />
              </View>
            </Pressable>

            <Pressable
              onPress={() => navigation.push('PasswordChange')}
              style={styles.menuHeight}>
              <View style={styles.menuStyle}>
                <Text style={styles.goMenuText}>비밀번호 변경</Text>
                <FontAwesomeIcon
                  icon={faAngleRight}
                  size={20}
                  style={styles.angleIcon}
                />
              </View>
            </Pressable>

            <Pressable
              onPress={() => navigation.push('Notice')}
              style={styles.menuHeight}>
              <View style={styles.menuStyle}>
                <Text style={styles.goMenuText}>공지사항</Text>
                <FontAwesomeIcon
                  icon={faAngleRight}
                  size={20}
                  style={styles.angleIcon}
                />
              </View>
            </Pressable>

            <Pressable style={styles.menuHeight}>
              <View style={styles.menuStyle}>
                <Text style={styles.goMenuText} onPress={loggedout}>
                  로그아웃
                </Text>
                <FontAwesomeIcon
                  icon={faAngleRight}
                  size={20}
                  style={styles.angleIcon}
                />
              </View>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    marginTop: 13,
    marginLeft: 5,
  },
  menuHeight: {
    marginVertical: 23,
  },
  myPageHeader: {
    marginLeft: 10,
  },
  myPageText: {
    fontSize: 15,
    color: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerUp: {
    flex: 1,
  },
  containerBottom: {
    flex: 2,
  },
  containerDown: {
    flex: 3,
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImg: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  userName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'black',
    paddingTop: 10,
  },
  userRank: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  info: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#57AAFF',
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
  },
  backIcon: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  line: {
    marginTop: 1,
    borderBottomColor: 'gray',
    borderBottomWidth: 3,
  },
  goMenuText: {
    marginLeft: 30,
    color: 'black',
    fontSize: 20,
  },
  angleIcon: {
    marginTop: 3,
    marginRight: 50,
  },
  menuStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default MyPage;
