// react import
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
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
import userSlice, {
  profileImageChange,
  userInfo,
} from '../../../slices/userSlice/user';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppText from '../../../components/AppText';
import AppTextBold from '../../../components/AppTextBold';
import Config from 'react-native-config';

// Navigation 사용
type MyPageScreenProps = NativeStackScreenProps<LoggedInParamList, '유저'>;
function MyPage({navigation}: MyPageScreenProps) {
  const dispatch = useAppDispatch();
  const [photo, setPhoto] = useState(''); //이미지 접근을 위한 State
  const [profileImage, setProfileImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  //로그아웃 버튼 클릭시 로그인창으로 화면전환
  const loggedout = () => {
    Alert.alert(
      '로그아웃',
      '로그아웃 하시겠어요?',
      [
        {
          text: '예',
          onPress: async () => {
            dispatch(userSlice.actions.setLogout(false));
            await AsyncStorage.clear();
          },
        },
        {
          text: '아니오',
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  };

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
  });

  // 유저정보를 받아오는 기능.
  useEffect(() => {
    dispatch(userInfo('a')).then(async res => {
      const si = res.payload?.address.split(' ');
      setUser({
        si: si.length > 1 ? si[0] : '',
        gu: si.length > 2 ? si[1] : '',
        dong: si.length > 3 ? si[2] : '',
        fullAddress: res.payload?.address,
        birth: res.payload?.birth,
        email: res.payload?.email,
        name: res.payload?.name,
        nickname: res.payload?.nickname,
        phone: res.payload?.phone,
      });

      setImageUrl(res.payload?.imageUrl);
    });
  }, [user.nickname, photo, user.si, user.phone, profileImage, imageUrl]);

  // 이미지 불러오기
  const showPicker = async () => {
    const grantedcamera = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'App Camera Permission',
        message: 'App needs access to your camera',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    const grantedstorage = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'App Camera Permission',
        message: 'App needs access to your camera',
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
                profileImageChange({
                  file: {
                    uri: 'file://' + localUri,
                    type: 'image/jpeg',
                    name: 'profileImage.jpg',
                  },
                }),
              )
                .then(res => {
                  if (res.meta.requestStatus === 'fulfilled') {
                    setPhoto('file://' + localUri);
                    return Alert.alert(
                      '알림',
                      '프로필 이미지 변경에 성공했습니다.',
                    );
                  }
                  return Alert.alert(
                    '알림',
                    '프로필 이미지 변경에 실패했습니다.',
                  );
                })
                .catch(err => {
                  return Alert.alert(
                    '알림',
                    '프로필 이미지 변경에 실패했습니다.',
                  );
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
                profileImageChange({
                  file: {
                    uri: 'file://' + localUri,
                    type: 'image/jpeg',
                    name: 'profileImage.jpg',
                  },
                }),
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
            {profileImage !== null ? (
              <Image
                source={{uri: `${Config.REACT_APP_BE_HOST}${imageUrl}`}}
                style={styles.userImg}
              />
            ) : (
              <Image
                source={require('../../../assets/user.png')}
                style={styles.userImg}
              />
            )}
            <View style={styles.userNickName}>
              <AppTextBold style={styles.userName}>
                {user.nickname} 님
              </AppTextBold>
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
                <AppText style={styles.goMenuText}>개인 정보 수정</AppText>
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
                <AppText style={styles.goMenuText}>비밀번호 변경</AppText>
                <FontAwesomeIcon
                  icon={faAngleRight}
                  size={20}
                  style={styles.angleIcon}
                />
              </View>
            </Pressable>

            <Pressable style={styles.menuHeight} onPress={loggedout}>
              <View style={styles.menuStyle}>
                <AppText style={styles.goMenuText}>로그아웃</AppText>
              </View>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userNickName: {
    flexDirection: 'row',
  },
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
    paddingTop: 10,
  },
  userRank: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  info: {
    fontSize: 15,
    color: '#57AAFF',
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
    fontSize: 15,
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
