import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {LoggedInParamList} from '../../../../AppInner';
import DismissKeyboardView from '../../../components/DismissKeyboardView';

// navigation을 사용하기 위해 type 설정
type UserInfoChangeScreenProps = NativeStackScreenProps<
  LoggedInParamList,
  'UserInfoChange'
>;

function UserInfoChange({navigation}: UserInfoChangeScreenProps) {
  // 화면에 띄워줄 임시 사용자 정보
  const [userInfo, setUserInfo] = useState({
    name: '사용자 이름',
    nickname: '사용자 별명',
    email: 'aaa@aaa.aaa',
    birth: '2022-09-15',
    phoneNumber: '010-0000-0000',
    address: {value: '충청남도', cityValue: '아산시'},
  });

  return (
    <DismissKeyboardView>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <View style={styles.textLabelGroup}>
            <Text style={styles.textLabel}>이름</Text>
            <Text style={styles.textLabel}>닉네임</Text>
            <Text style={styles.textLabel}>이메일</Text>
            <Text style={styles.textLabel}>생년월일</Text>
            <Text style={styles.textLabel}>전화번호</Text>
            <Text style={styles.textLabel}>실 거주지</Text>
          </View>
          <View style={styles.textGroup}>
            <Text style={styles.text}>{userInfo.name}</Text>
            {/* 우측 화살표를 눌러서 닉네임 변경 페이지로 이동
                params로 user정보를 전달
              */}
            <Pressable
              style={styles.goToChangeForm}
              onPress={() =>
                navigation.navigate('NicknameChangeForm', {
                  userInfo: userInfo,
                  setUserInfo: setUserInfo,
                })
              }>
              <Text style={styles.text}>{userInfo.nickname}</Text>
              <FontAwesomeIcon
                icon={faChevronRight}
                size={15}
                style={styles.icon}
              />
            </Pressable>
            <Text style={styles.text}>{userInfo.email}</Text>
            <Text style={styles.text}>{userInfo.birth}</Text>
            {/* 우측 화살표를 눌러서 전화번호 변경 페이지로 이동
                params로 user정보를 전달
              */}
            <Pressable
              style={styles.goToChangeForm}
              onPress={() =>
                navigation.navigate('PhoneNumberChangeForm', {
                  userInfo: userInfo,
                  setUserInfo: setUserInfo,
                })
              }>
              <Text style={styles.text}>{userInfo.phoneNumber}</Text>
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
                  userInfo: userInfo,
                  setUserInfo: setUserInfo,
                })
              }>
              <Text style={styles.text}>
                {userInfo.address.value} {userInfo.address.cityValue}
              </Text>
              <FontAwesomeIcon
                icon={faChevronRight}
                size={15}
                style={styles.icon}
              />
            </Pressable>
          </View>
        </View>
        <Pressable style={styles.button}>
          <Text>회원 탈퇴</Text>
        </Pressable>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
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
  },
  textLabelGroup: {
    flex: 0.3,
  },
  textGroup: {
    flex: 0.7,
  },
  textLabel: {
    fontWeight: '700',
    color: 'black',
    marginVertical: 10,
  },
  goToChangeForm: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    marginVertical: 10,
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
