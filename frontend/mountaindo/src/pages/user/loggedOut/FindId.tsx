import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useRef, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native';
import {RootStackParamList} from '../../../../AppInner';
import DatePicker from '../../../components/user/DatePicker';
import DismissKeyboardView from '../../../components/DismissKeyboardView';
import {useAppDispatch} from '../../../store';
import {findEmail} from '../../../slices/userSlice/user';
import AppTextBold from '../../../components/AppTextBold';
import AppText from '../../../components/AppText';

// navigation을 사용하기 위해 type 설정
type FindIdScreenProps = NativeStackScreenProps<RootStackParamList, 'FindId'>;

function FindId({navigation}: FindIdScreenProps) {
  const [name, setName] = useState(''); // 사용자 이름 저장할 변수
  const [selectedDate, setSelectedDate] = useState(''); // 선택 날짜를 문자열 형태로 변경하여 저장할 변수
  const [phone, setPhone] = useState(''); // 사용자 휴대폰번호를 저장할 변수
  const [userEmail, setUserEmail] = useState('');

  const [check, setCheck] = useState(0); // 달력에 날짜를 선택했는지 확인할 변수
  const [visibleId, setVisibleId] = useState(false); // 아이디 찾기에 성공했을 경우 화면 변경할 변수 ex) true면 아이디, false면 아이디 찾기 화면

  const nameRef = useRef<TextInput | null>(null); // 사용자 이름 input의 값 가져오기
  const phoneRef = useRef<TextInput | null>(null); // 사용자 휴대폰번호 input의 값 가져오기

  const dispatch = useAppDispatch();

  // 사용자 이름 input값 변경 시 name 변수에 값 변경
  const onChangeName = useCallback((text: string) => {
    setName(text.trim());
  }, []);

  // 사용자 휴대폰번호 input값 변경 시 phone 변수에 값 변경
  const onChangPhone = useCallback((text: string) => {
    setPhone(text.trim());
  }, []);

  // 아아디 찾기 버튼을 눌렀을 때 유효성 검사
  const onSubmit = useCallback(() => {
    if (!name || !name.trim()) {
      return Alert.alert('알림', '이름을 입력해주세요.');
    }
    if (!check) {
      return Alert.alert('알림', '생년월일을 입력해주세요.');
    }
    if (!phone || !phone.trim()) {
      return Alert.alert('알림', '휴대폰 번호를 입력해주세요.');
    }
    if (!/^[0-9]{3}-[0-9]{3,4}-[0-9]{4}/.test(phone)) {
      return Alert.alert(
        '알림',
        '숫자, -을 포함해 휴대전화 형식에 맞게 입력해주세요.',
      );
    }
    // 아이디 찾기 요청
    dispatch(findEmail({name, phone, birth: selectedDate}))
      .then(res => {
        if (res.payload?.email) {
          setUserEmail(res.payload.email); // 이메일 정보 저장
          setVisibleId(true); // 이메일 보여주는 화면으로 전환
        } else {
          Alert.alert(
            '아이디 찾기 실패',
            '아이디 찾기에 실패했습니다. 다시 시도해주세요!',
          );
        }
      })
      .catch(err => {
        Alert.alert(
          '아이디 찾기 실패',
          '아이디 찾기에 실패했습니다. 다시 시도해주세요!',
        );
      });
  }, [name, phone, check]);

  const canGoNext = name && phone && !!check; // 버튼 disabled 확인할 변수
  return (
    <DismissKeyboardView>
      {visibleId ? (
        <View>
          <View style={styles.titleView}>
            <AppTextBold style={styles.title}>아이디 찾기 성공</AppTextBold>
          </View>
          <View style={styles.findIdView}>
            <AppTextBold style={styles.findIdText}>{userEmail}</AppTextBold>
          </View>
          <View style={styles.toLoginButton}>
            <Pressable onPress={() => navigation.navigate('SignIn')}>
              <AppText>로그인</AppText>
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={styles.inputGroup}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeName}
              placeholder="이름 입력해주세요"
              placeholderTextColor="#666"
              importantForAutofill="yes"
              autoComplete="name"
              textContentType="name"
              value={name}
              returnKeyType="next"
              clearButtonMode="while-editing"
              ref={nameRef}
              blurOnSubmit={false}
            />
          </View>
          <View>
            <DatePicker
              setCheck={setCheck}
              setSelectedDate={setSelectedDate}
              selectedDate={selectedDate}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              onChangeText={onChangPhone}
              placeholder="휴대폰 번호를 입력해주세요 ex) 010-1234-5678"
              placeholderTextColor="#666"
              importantForAutofill="yes"
              autoComplete="tel"
              textContentType="telephoneNumber"
              value={phone}
              returnKeyType="send"
              clearButtonMode="while-editing"
              ref={phoneRef}
              onSubmitEditing={onSubmit}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.findPasswordButton}>
            <Pressable onPress={() => navigation.push('FindPassword')}>
              <AppText>비밀번호 찾기</AppText>
            </Pressable>
          </View>
          <View>
            <Pressable
              disabled={!canGoNext}
              onPress={onSubmit}
              style={
                canGoNext
                  ? StyleSheet.compose(
                      styles.findIdButton,
                      styles.findIdButtonActive,
                    )
                  : styles.findIdButton
              }>
              <AppText style={styles.buttonText}>아이디 찾기</AppText>
            </Pressable>
          </View>
        </View>
      )}
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  findIdView: {
    backgroundColor: '#dadada',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 5,
    marginVertical: 30,
    marginHorizontal: 20,
  },
  findIdText: {
    textAlign: 'center',
    fontSize: 20,
  },
  toLoginButton: {
    alignItems: 'flex-end',
    marginVertical: 10,
    marginHorizontal: 25,
  },
  inputGroup: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  inputView: {
    marginVertical: 10,
  },
  input: {
    borderBottomWidth: 1,
    fontFamily: 'NanumBarunGothic',
  },
  findPasswordButton: {
    alignItems: 'flex-end',
    marginVertical: 10,
  },
  findIdButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 20,
    marginVertical: 10,
  },
  findIdButtonActive: {
    backgroundColor: 'blue',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
  titleView: {
    marginTop: 30,
    marginHorizontal: 25,
  },
  title: {
    fontSize: 15,
  },
});

export default FindId;
