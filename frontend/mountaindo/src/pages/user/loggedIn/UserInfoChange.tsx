import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import {LoggedInParamList} from '../../../../AppInner';
import AppText from '../../../components/AppText';
import AppTextBold from '../../../components/AppTextBold';
import DismissKeyboardView from '../../../components/DismissKeyboardView';
import userSlice, {signOut} from '../../../slices/userSlice/user';
import {useAppDispatch} from '../../../store';

// navigation을 사용하기 위해 type 설정
type UserInfoChangeScreenProps = NativeStackScreenProps<
  LoggedInParamList,
  'UserInfoChange'
>;

function UserInfoChange({navigation, route}: UserInfoChangeScreenProps) {
  // 화면에 띄워줄 임시 사용자 정보 [주소 변경 API 미연결  하여 아직 지우지 않았습니다.]
  const dispatch = useAppDispatch();
  useEffect(() => {}, [route.params?.user]);
  return (
    <DismissKeyboardView style={styles.backColor}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <View style={styles.textLabelGroup}>
            <AppTextBold style={styles.textLabel}>이름</AppTextBold>
            <AppTextBold style={styles.textLabel}>닉네임</AppTextBold>
            <AppTextBold style={styles.textLabel}>이메일</AppTextBold>
            <AppTextBold style={styles.textLabel}>생년월일</AppTextBold>
            <AppTextBold style={styles.textLabel}>전화번호</AppTextBold>
            <AppTextBold style={styles.textLabel}>실 거주지</AppTextBold>
          </View>
          <View style={styles.textGroup}>
            <AppText style={styles.text}>{route.params?.user.name}</AppText>
            {/* 우측 화살표를 눌러서 닉네임 변경 페이지로 이동
                params로 user정보를 전달 */}
            <Pressable
              style={styles.goToChangeForm}
              onPress={() =>
                navigation.navigate('NicknameChangeForm', {
                  user: route.params?.user,
                  setUser: route.params?.setUser,
                })
              }>
              <AppText style={styles.text}>
                {route.params?.user.nickname}
              </AppText>
              <FontAwesomeIcon
                icon={faChevronRight}
                size={15}
                style={styles.icon}
              />
            </Pressable>
            <AppText style={styles.text}>{route.params?.user.email}</AppText>
            <AppText style={styles.text}>{route.params?.user.birth}</AppText>
            {/* 우측 화살표를 눌러서 전화번호 변경 페이지로 이동
                params로 user정보를 전달
              */}
            <Pressable
              style={styles.goToChangeForm}
              onPress={() =>
                navigation.navigate('PhoneNumberChangeForm', {
                  user: route.params?.user,
                  setUser: route.params?.setUser,
                })
              }>
              <AppText style={styles.text}>{route.params?.user.phone}</AppText>
              <FontAwesomeIcon
                icon={faChevronRight}
                size={15}
                style={styles.icon}
              />
            </Pressable>
            <Pressable
              style={styles.goToChangeForm}
              onPress={() =>
                navigation.navigate('AddressChangeForm', {
                  user: route.params?.user,
                  setUser: route.params?.setUser,
                })
              }>
              <View style={styles.textStyle}>
                <AppText style={styles.text}>{route.params?.user.si}</AppText>
                <AppText style={styles.gutext}>{route.params?.user.gu}</AppText>
              </View>
              <FontAwesomeIcon
                icon={faChevronRight}
                size={15}
                style={styles.icon}
              />
            </Pressable>
          </View>
        </View>
        <Pressable
          style={styles.button}
          onPress={() => {
            Alert.alert(
              '회원탈퇴',
              '회원탈퇴 하시겠어요?',
              [
                {
                  text: '예',
                  onPress: async () => {
                    dispatch(signOut(''))
                      .then(async res => {
                        // 회원 탈퇴 요청 성공 시 => AsyncStorage에서 token제거, logout처리
                        if (res.meta.requestStatus === 'fulfilled') {
                          await AsyncStorage.removeItem('token');
                          dispatch(userSlice.actions.setLogout(''));
                        }
                      })
                      .catch(err => {
                        console.log(err);
                      });
                  },
                },
                {
                  text: '아니오',
                  style: 'cancel',
                },
              ],
              {cancelable: true},
            );
          }}>
          <AppText>회원 탈퇴</AppText>
        </Pressable>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  backColor: {
    backgroundColor: 'white',
  },
  textStyle: {
    flexDirection: 'row',
  },
  gutext: {
    marginVertical: 15,
    marginLeft: 5,
  },
  container: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  icon: {
    marginVertical: 10,
  },
  textContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
  },
  textLabelGroup: {
    flex: 0.3,
  },
  textGroup: {
    flex: 0.7,
  },
  textLabel: {
    fontWeight: '900',
    color: 'black',
    marginVertical: 11.5,
    marginBottom: 16.5,
  },
  goToChangeForm: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginVertical: 15.2,
  },
  textInput: {
    padding: 0,
    marginVertical: 5,
    borderBottomWidth: 1,
  },
  button: {
    alignItems: 'flex-end',
  },
});

export default UserInfoChange;
